import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.warn('⚠️ MONGODB_URI is not defined in backend/.env. Using local JSON fallback.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`🍃 MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
    console.warn('⚠️ Fallback to local JSON storage enabled.');
    return false;
  }
};
