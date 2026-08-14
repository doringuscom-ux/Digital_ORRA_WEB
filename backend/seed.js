import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';

// Mongoose Models
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

const getDataFilePath = (fileName) => path.join(__dirname, 'data', `${fileName}.json`);

const readJsonData = (fileName) => {
  const filePath = getDataFilePath(fileName);
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
};

import User from './models/User.js';

export const seedDatabase = async () => {
  const isConnected = await connectDB();
  if (!isConnected) {
    console.warn('⚠️ Cannot seed database because MongoDB Atlas is not connected.');
    return;
  }

  console.log('🔄 Starting data migration from local JSON files to MongoDB Atlas...');

  // Seed Default Admin User if none exists
  try {
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      await User.create({
        username: 'admin',
        email: 'admin@digitalorra.com',
        displayName: 'Digital ORRA Super Admin',
        password: 'admin123',
        role: 'admin'
      });
      console.log('🔑 Default Admin User created in MongoDB Atlas! (username: admin, password: admin123)');
    } else {
      console.log(`⚡ MongoDB Atlas already contains ${adminCount} Admin User(s).`);
    }
  } catch (userSeedErr) {
    console.error('❌ Error seeding Admin User:', userSeedErr.message);
  }

  const resources = [
    { name: 'services', model: Service },
    { name: 'portfolio', model: Portfolio },
    { name: 'blog', model: Blog },
    { name: 'courses', model: Course },
    { name: 'careers', model: Career },
    { name: 'leads', model: Lead },
    { name: 'reviews', model: Review },
    { name: 'gallery', model: Gallery }
  ];

  for (const { name, model } of resources) {
    try {
      const existingCount = await model.countDocuments();
      if (existingCount === 0) {
        const jsonItems = readJsonData(name);
        if (jsonItems && jsonItems.length > 0) {
          // Clean up items for Mongoose insertion (remove custom string ids if invalid Mongo ObjectIds)
          const itemsToInsert = jsonItems.map(item => {
            const copy = { ...item };
            delete copy._id;
            return copy;
          });
          await model.insertMany(itemsToInsert);
          console.log(`✅ Migrated ${jsonItems.length} items from ${name}.json to MongoDB Atlas!`);
        } else {
          console.log(`ℹ️ ${name}.json is empty, skipped.`);
        }
      } else {
        console.log(`⚡ MongoDB Atlas already contains ${existingCount} ${name} documents.`);
      }
    } catch (err) {
      console.error(`❌ Migration error for ${name}:`, err.message);
    }
  }

  console.log('🎉 Data Migration to MongoDB Atlas Completed Successfully!');
};

// Execute if run directly via node seed.js
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDatabase().then(() => {
    mongoose.connection.close();
    process.exit(0);
  });
}
