import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String },
  type: { type: String, default: 'Contact Form' }, // 'Contact Form', 'Audit Request', 'Job Application'
  platform: { type: String },
  website: { type: String },
  notes: { type: String },
  status: { type: String, default: 'New' }, // 'New', 'Contacted'
  date: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
