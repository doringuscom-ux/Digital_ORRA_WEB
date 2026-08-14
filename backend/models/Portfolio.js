import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  cloudinaryId: { type: String },
  client: { type: String },
  link: { type: String },
  tags: [{ type: String }],
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Portfolio', portfolioSchema);
