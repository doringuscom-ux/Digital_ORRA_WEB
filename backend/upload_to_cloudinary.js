import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from './config/db.js';

import Service from './models/Service.js';
import Portfolio from './models/Portfolio.js';
import Blog from './models/Blog.js';
import Course from './models/Course.js';
import Career from './models/Career.js';
import Lead from './models/Lead.js';
import Review from './models/Review.js';
import Gallery from './models/Gallery.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '..', 'frontend', 'public');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadFileToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'digitalorra_dynamic'
    });
    return result.secure_url;
  } catch (err) {
    console.error(`Error uploading ${filePath}:`, err.message);
    return null;
  }
}

async function uploadBase64ToCloudinary(base64Str) {
  try {
    const result = await cloudinary.uploader.upload(base64Str, {
      folder: 'digitalorra_dynamic'
    });
    return result.secure_url;
  } catch (err) {
    console.error('Error uploading base64:', err.message);
    return null;
  }
}

async function processImageRef(imgRef, cacheMap) {
  if (!imgRef || typeof imgRef !== 'string') return imgRef;
  
  if (imgRef.startsWith('http://') || imgRef.startsWith('https://')) {
    if (imgRef.includes('cloudinary.com')) return imgRef;
    if (cacheMap.has(imgRef)) return cacheMap.get(imgRef);
    console.log(`Uploading web image: ${imgRef}`);
    const url = await uploadBase64ToCloudinary(imgRef);
    if (url) cacheMap.set(imgRef, url);
    return url || imgRef;
  }

  if (imgRef.startsWith('data:image')) {
    if (cacheMap.has(imgRef)) return cacheMap.get(imgRef);
    console.log(`Uploading base64 image (length ${imgRef.length})...`);
    const url = await uploadBase64ToCloudinary(imgRef);
    if (url) cacheMap.set(imgRef, url);
    return url || imgRef;
  }

  const relPath = imgRef.startsWith('/') ? imgRef.slice(1) : imgRef;
  const fullPath = path.join(PUBLIC_DIR, relPath);

  if (fs.existsSync(fullPath)) {
    if (cacheMap.has(fullPath)) return cacheMap.get(fullPath);
    console.log(`Uploading local public file: ${relPath}`);
    const url = await uploadFileToCloudinary(fullPath);
    if (url) cacheMap.set(fullPath, url);
    return url || imgRef;
  } else {
    console.warn(`File not found in public: ${fullPath}`);
    return imgRef;
  }
}

async function migrateAllDynamicImages() {
  console.log('🚀 Connecting to MongoDB Atlas & Cloudinary...');
  const isConnected = await connectDB();
  if (!isConnected) {
    console.error('❌ Could not connect to MongoDB Atlas.');
    process.exit(1);
  }

  const cacheMap = new Map();

  // 1. Migrate Gallery
  console.log('\n📸 Migrating Gallery Images...');
  const galleryItems = await Gallery.find();
  for (const item of galleryItems) {
    if (item.image) {
      const newUrl = await processImageRef(item.image, cacheMap);
      if (newUrl !== item.image) {
        item.image = newUrl;
        await item.save();
        console.log(`✅ Updated Gallery ID ${item._id} -> ${newUrl}`);
      }
    }
  }

  // 2. Migrate Blog
  console.log('\n📰 Migrating Blog Images...');
  const blogItems = await Blog.find();
  for (const item of blogItems) {
    if (item.image) {
      const newUrl = await processImageRef(item.image, cacheMap);
      if (newUrl !== item.image) {
        item.image = newUrl;
        await item.save();
        console.log(`✅ Updated Blog ID ${item._id} -> ${newUrl}`);
      }
    }
    if (item.img) {
      const newUrl = await processImageRef(item.img, cacheMap);
      if (newUrl !== item.img) {
        item.img = newUrl;
        await item.save();
      }
    }
  }

  // 3. Migrate Portfolio
  console.log('\n💼 Migrating Portfolio Images...');
  const portfolioItems = await Portfolio.find();
  for (const item of portfolioItems) {
    if (item.image) {
      const newUrl = await processImageRef(item.image, cacheMap);
      if (newUrl !== item.image) {
        item.image = newUrl;
        await item.save();
        console.log(`✅ Updated Portfolio ID ${item._id} -> ${newUrl}`);
      }
    }
    if (item.img) {
      const newUrl = await processImageRef(item.img, cacheMap);
      if (newUrl !== item.img) {
        item.img = newUrl;
        await item.save();
      }
    }
  }

  // 4. Migrate Services
  console.log('\n⚙️ Migrating Service Images...');
  const serviceItems = await Service.find();
  for (const item of serviceItems) {
    if (item.image) {
      const newUrl = await processImageRef(item.image, cacheMap);
      if (newUrl !== item.image) {
        item.image = newUrl;
        await item.save();
        console.log(`✅ Updated Service ID ${item._id} -> ${newUrl}`);
      }
    }
    if (item.icon && (item.icon.includes('/') || item.icon.startsWith('data:'))) {
      const newUrl = await processImageRef(item.icon, cacheMap);
      if (newUrl !== item.icon) {
        item.icon = newUrl;
        await item.save();
      }
    }
  }

  // 5. Migrate Courses
  console.log('\n🎓 Migrating Course Images...');
  const courseItems = await Course.find();
  for (const item of courseItems) {
    if (item.image) {
      const newUrl = await processImageRef(item.image, cacheMap);
      if (newUrl !== item.image) {
        item.image = newUrl;
        await item.save();
        console.log(`✅ Updated Course ID ${item._id} -> ${newUrl}`);
      }
    }
  }

  // 6. Migrate Reviews
  console.log('\n⭐ Migrating Review Avatars...');
  const reviewItems = await Review.find();
  for (const item of reviewItems) {
    if (item.image) {
      const newUrl = await processImageRef(item.image, cacheMap);
      if (newUrl !== item.image) {
        item.image = newUrl;
        await item.save();
        console.log(`✅ Updated Review ID ${item._id} -> ${newUrl}`);
      }
    }
    if (item.avatar) {
      const newUrl = await processImageRef(item.avatar, cacheMap);
      if (newUrl !== item.avatar) {
        item.avatar = newUrl;
        await item.save();
      }
    }
  }

  // Sync back to local json files
  console.log('\n💾 Syncing updated MongoDB records back to local JSON fallback files...');
  const syncJson = async (name, model) => {
    const docs = await model.find().lean();
    const filePath = path.join(__dirname, 'data', `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(docs, null, 2), 'utf-8');
    console.log(`✅ Local ${name}.json updated with Cloudinary URLs.`);
  };

  await syncJson('gallery', Gallery);
  await syncJson('blog', Blog);
  await syncJson('portfolio', Portfolio);
  await syncJson('services', Service);
  await syncJson('courses', Course);
  await syncJson('reviews', Review);

  console.log('\n🎉 ALL DYNAMIC IMAGES MIGRATED TO CLOUDINARY SUCCESSFULLY!');
  process.exit(0);
}

migrateAllDynamicImages();
