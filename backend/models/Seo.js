import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  pageSlug: { type: String, required: true, unique: true }, // e.g. 'home', 'services', 'courses', 'blog', 'about-us', 'contact-us'
  pageName: { type: String, required: true },
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  focusKeywords: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  ogImage: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Seo', seoSchema);
