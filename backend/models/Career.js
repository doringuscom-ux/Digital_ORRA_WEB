import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, default: 'Panchkula, HR / Remote' },
  experience: { type: String, default: '1-3 Years' },
  type: { type: String, default: 'Full-Time' },
  salary: { type: String, default: 'Best in Industry' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Career', careerSchema);
