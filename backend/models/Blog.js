import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  category: { type: String, default: 'Digital Marketing' },
  image: { type: String },
  cloudinaryId: { type: String },
  readTime: { type: String, default: '5 Min Read' },
  date: { type: String },
  excerpt: { type: String },
  content: { type: String },
  author: { type: String, default: 'Digital ORRA Team' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
