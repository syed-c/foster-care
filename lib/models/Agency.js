import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ReviewSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(),
  },
  userId: {
    type: String,
    required: true,
  },
  userName: String,
  comment: String,
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AgencySchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  logo: String,
  coverImage: String,
  description: String,
  location: {
    city: String,
    region: String,
    postcode: String,
    address: String,
  },
  type: {
    type: String,
    enum: ['Private', 'Charity', 'Local Authority'],
    default: 'Private',
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  reviews: [ReviewSchema],
  services: [String],
  contactEmail: String,
  contactPhone: String,
  website: String,
  featured: {
    type: Boolean,
    default: false,
  },
  recruiting: {
    type: Boolean,
    default: true,
  },
  accreditation: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate average rating when reviews change
AgencySchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.reviewCount = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.stars, 0);
    this.rating = sum / this.reviews.length;
    this.reviewCount = this.reviews.length;
  }
};

export default mongoose.models.Agency || mongoose.model('Agency', AgencySchema);