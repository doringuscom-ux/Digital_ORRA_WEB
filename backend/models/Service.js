import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  category: { type: String, default: 'General' },
  tag: { type: String, default: 'Core Service' },
  desc: { type: String },
  features: [{ type: String }],
  iconName: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
