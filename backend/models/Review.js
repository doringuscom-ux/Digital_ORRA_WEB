import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  clientName: { type: String },
  name: { type: String },
  role: { type: String, default: 'Client' },
  company: { type: String },
  rating: { type: Number, default: 5 },
  quote: { type: String },
  review: { type: String },
  image: { type: String },
  cloudinaryId: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
