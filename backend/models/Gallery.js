import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String },
  category: { type: String, default: 'General' },
  image: { type: String, required: true },
  cloudinaryId: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
