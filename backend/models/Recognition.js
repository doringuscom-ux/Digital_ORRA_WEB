import mongoose from 'mongoose';

const recognitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['awards', 'news']
  },
  year: {
    type: String,
    default: new Date().getFullYear().toString()
  },
  issuer: { // or publisher for news
    type: String,
    trim: true
  },
  description: { // or snippet for news
    type: String,
    trim: true
  },
  image: {
    type: String, // Cloudinary URL
    required: true
  },
  badgeText: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Recognition = mongoose.model('Recognition', recognitionSchema);

export default Recognition;

