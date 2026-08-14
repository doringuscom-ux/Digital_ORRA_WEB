import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import { upload } from './config/cloudinary.js';

// Mongoose Models
import Service from './models/Service.js';
import Portfolio from './models/Portfolio.js';
import Blog from './models/Blog.js';
import Course from './models/Course.js';
import Career from './models/Career.js';
import Lead from './models/Lead.js';
import Review from './models/Review.js';
import Gallery from './models/Gallery.js';
import Recognition from './models/Recognition.js';
import seoRoutes from './routes/seoRoutes.js';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import { protectAdmin } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: true, // Allow all origins for local networking, or restrict to frontend URL
  credentials: true
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' }
});

import { seedDatabase } from './seed.js';

// Connect to MongoDB Atlas & Auto-Migrate
let isMongoConnected = false;
connectDB().then(async (status) => {
  isMongoConnected = status;
  if (status) {
    await seedDatabase();
  }
});

// JSON File Fallback Helpers
const getDataFilePath = (fileName) => path.join(__dirname, 'data', `${fileName}.json`);

const readJsonData = (fileName) => {
  const filePath = getDataFilePath(fileName);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw || '[]');
};

const writeJsonData = (fileName, data) => {
  const filePath = getDataFilePath(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const modelMap = {
  services: Service,
  portfolio: Portfolio,
  blog: Blog,
  courses: Course,
  careers: Career,
  leads: Lead,
  reviews: Review,
  gallery: Gallery,
  recognitions: Recognition
};

// Mount SEO Routes
app.use('/api/seo', seoRoutes);

// Public Config Endpoint (returns AUDIT_REDIRECT_LINK from backend .env)
app.get('/api/config', (req, res) => {
  res.json({
    auditRedirectLink: process.env.AUDIT_REDIRECT_LINK || 'https://digitalorra.com'
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Digital ORRA Express API Server Running',
    database: isMongoConnected ? 'MongoDB Atlas Online' : 'Local JSON File Mode'
  });
});

// Cloudinary Image Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    res.json({
      success: true,
      url: req.file.path, // Cloudinary CDN URL
      public_id: req.file.filename
    });
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    res.status(500).json({ error: 'Cloudinary Image Upload Failed' });
  }
});

// Dynamic CRUD Routes (MongoDB Atlas with JSON Fallback)
// Public routes that don't need auth for POST (e.g., leads from contact form)
const publicPostRoutes = ['leads'];

const registerCrudRoutes = (resourceName) => {
  const Model = modelMap[resourceName];

  // GET ALL (Public — website needs to read data)
  app.get(`/api/${resourceName}`, async (req, res) => {
    try {
      if (isMongoConnected && Model) {
        const items = await Model.find().sort({ createdAt: -1 });
        return res.json(items);
      }
      const items = readJsonData(resourceName);
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch ${resourceName}` });
    }
  });

  // POST NEW (Protected — except public routes like leads)
  const postMiddleware = publicPostRoutes.includes(resourceName) ? [] : [protectAdmin];
  app.post(`/api/${resourceName}`, ...postMiddleware, async (req, res) => {
    try {
      if (isMongoConnected && Model) {
        const newItem = new Model(req.body);
        await newItem.save();
        return res.status(201).json(newItem);
      }
      const items = readJsonData(resourceName);
      const newItem = { id: Date.now().toString(), ...req.body };
      items.unshift(newItem);
      writeJsonData(resourceName, items);
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: `Failed to create ${resourceName}` });
    }
  });

  // PUT UPDATE (Protected — admin only)
  app.put(`/api/${resourceName}/:id`, protectAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      if (isMongoConnected && Model) {
        const updated = await Model.findByIdAndUpdate(id, req.body, { new: true });
        if (updated) return res.json(updated);
      }
      let items = readJsonData(resourceName);
      const index = items.findIndex(i => String(i.id) === String(id));
      if (index !== -1) {
        items[index] = { ...items[index], ...req.body };
        writeJsonData(resourceName, items);
        return res.json(items[index]);
      }
      res.status(404).json({ error: 'Item not found' });
    } catch (err) {
      res.status(500).json({ error: `Failed to update ${resourceName}` });
    }
  });

  // DELETE (Protected — admin only)
  app.delete(`/api/${resourceName}/:id`, protectAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      if (isMongoConnected && Model) {
        await Model.findByIdAndDelete(id);
        return res.json({ success: true, message: `Item ${id} deleted` });
      }
      let items = readJsonData(resourceName);
      items = items.filter(i => String(i.id) !== String(id));
      writeJsonData(resourceName, items);
      res.json({ success: true, message: `Item ${id} deleted` });
    } catch (err) {
      res.status(500).json({ error: `Failed to delete ${resourceName}` });
    }
  });
};

['services', 'portfolio', 'blog', 'courses', 'careers', 'leads', 'reviews', 'gallery', 'recognitions'].forEach(registerCrudRoutes);

// ===== EMAIL VERIFICATION OTP SYSTEM (Google Script) =====
const otpStore = new Map(); // email -> { otp, expiresAt }

// POST /api/send-otp — Generate & send 6-digit OTP to email
app.post('/api/send-otp', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min expiry

    otpStore.set(email.toLowerCase(), { otp, expiresAt });

    const mailOptions = {
      to: email,
      subject: '🔐 Digital ORRA — Admin Email Verification OTP',
      body: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; background: #0B111E; color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #1E293B;">
          <div style="background: linear-gradient(135deg, #E6007E 0%, #7928CA 100%); padding: 28px 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #FFFFFF;">Digital ORRA Admin</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.85);">Email Verification Code</p>
          </div>
          <div style="padding: 30px 24px; text-align: center;">
            <p style="color: #94A3B8; font-size: 14px; margin: 0 0 20px;">Your one-time verification code is:</p>
            <div style="background: rgba(230, 0, 126, 0.1); border: 2px dashed #E6007E; border-radius: 12px; padding: 18px 24px; display: inline-block;">
               <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #E6007E;">${otp}</span>
            </div>
            <p style="color: #64748B; font-size: 12px; margin: 20px 0 0;">This code expires in <strong style="color: #FBBF24;">5 minutes</strong>. Do not share it with anyone.</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); border-top: 1px solid #1E293B; padding: 14px 24px; text-align: center;">
            <p style="color: #475569; font-size: 11px; margin: 0;">© Digital ORRA • Admin Security System</p>
          </div>
        </div>
      `
    };

    // Use Google Apps Script instead of nodemailer
    const url = process.env.GOOGLE_SCRIPT_URL;
    if (!url) throw new Error("GOOGLE_SCRIPT_URL not configured");

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mailOptions)
    });

    const result = await response.json();
    if (!result.success) throw new Error("Google Script Error: " + result.error);
    console.log(`📧 OTP sent to ${email}: ${otp}`);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    console.error('❌ Email send error:', err.message);
    res.status(500).json({ error: 'Failed to send OTP via Google Script.' });
  }
});

// POST /api/verify-otp — Verify the 6-digit OTP
app.post('/api/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

    const record = otpStore.get(email.toLowerCase());
    if (!record) return res.status(400).json({ error: 'No OTP found for this email. Please request a new one.' });

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email.toLowerCase());
      return res.status(400).json({ error: 'OTP has expired! Please request a new code.' });
    }

    if (record.otp !== String(otp)) {
      return res.status(400).json({ error: 'Invalid OTP code! Please check and try again.' });
    }

    otpStore.delete(email.toLowerCase());
    res.json({ success: true, message: 'Email verified successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

// =============================================
// ADMIN AUTHENTICATION & PROFILE ROUTES (MONGODB)
// =============================================

// POST /api/admin/login — Authenticate admin against MongoDB
app.post('/api/admin/login', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username/email and password' });
    }

    const inputClean = username.toLowerCase().trim();

    if (!isMongoConnected) {
      return res.status(500).json({ success: false, message: 'Database connection failed. Cannot login at this time.' });
    }

    const user = await User.findOne({
      $or: [{ username: inputClean }, { email: inputClean }]
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// POST /api/admin/reset-password — Reset password using OTP
app.post('/api/admin/reset-password', authLimiter, async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    const inputClean = email.toLowerCase().trim();

    // Verify OTP
    const record = otpStore.get(inputClean);
    if (!record) {
      return res.status(400).json({ success: false, message: 'No valid OTP session found or OTP expired. Please request a new OTP.' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(inputClean);
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }

    if (record.otp !== String(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP code.' });
    }

    if (!isMongoConnected) {
      return res.status(500).json({ success: false, message: 'Database connection failed.' });
    }

    // OTP is valid, now find user and update password
    const user = await User.findOne({ email: inputClean });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Admin user not found with this email.' });
    }

    user.password = newPassword; // mongoose pre-save hook handles hashing
    await user.save();

    // Clear OTP after successful reset
    otpStore.delete(inputClean);

    res.json({ success: true, message: 'Password reset successfully! You can now log in.' });
  } catch (err) {
    console.error('❌ Password reset error:', err);
    res.status(500).json({ success: false, message: 'Server error during password reset' });
  }
});

// GET /api/admin/me — Get current admin user details (Protected)
app.get('/api/admin/me', protectAdmin, async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      displayName: req.user.displayName,
      role: req.user.role
    }
  });
});

// GET /api/admin/logout — Logout admin by clearing cookie
app.get('/api/admin/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// PUT /api/admin/update-settings — Update admin credentials in MongoDB (Protected)
app.put('/api/admin/update-settings', protectAdmin, async (req, res) => {
  try {
    const { displayName, username, email, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Validate current password if password change is requested
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: 'Current password is required to set new password' });
      }
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password does not match!' });
      }
      user.password = newPassword;
    }

    if (displayName) user.displayName = displayName;
    if (username) user.username = username.toLowerCase().trim();
    if (email) user.email = email.toLowerCase().trim();

    await user.save();

    res.json({
      success: true,
      message: 'Admin Settings updated successfully in MongoDB Atlas!',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role
      }
    });
  } catch (err) {
    console.error('❌ Settings update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update admin settings in database' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Digital ORRA Backend API running at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${PORT} is ALREADY IN USE by a running backend server!`);
    console.log(`👉 Your Express Backend API is ALREADY running and connected to MongoDB Atlas.`);
    console.log(`👉 To restart the server, kill port 5000 using: npx kill-port 5000`);
  } else {
    console.error('Server error:', err);
  }
});

// Server start logic is wrapped inside connectDB.then() at the top
