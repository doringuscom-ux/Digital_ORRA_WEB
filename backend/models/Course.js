import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  badge: { type: String, default: 'Academy Certification' },
  category: { type: String, default: 'Digital Marketing' },
  duration: { type: String, default: '3 Months' },
  price: { type: String, default: 'Best Industry Price' },
  originalPrice: { type: String },
  discount: { type: String },
  subtitle: { type: String },
  description: { type: String },
  idealFor: { type: String },
  popular: { type: Boolean, default: false },
  hasInternship: { type: Boolean, default: false },
  placementAssistance: { type: Boolean, default: true },
  syllabusPdf: { type: String, default: '#' },
  iconName: { type: String, default: 'TrendingUp' },
  iconColor: { type: String, default: 'pink' },
  syllabus: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true, strict: false });

export default mongoose.model('Course', courseSchema);



