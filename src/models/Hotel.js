const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel must have a name'],
    trim: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  rating: {
    type: Number,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    // 'min' and 'max' not only work for 'Number', also work for 'Date'
  },

  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

//* (1) means 'Ascending' and (-1) means 'Descending'

// HotelSchema.index({ price: 1}) //* => single index
// HotelSchema.index({ slug: 1}) //* => single index
// HotelSchema.index({ price: 1, ratingsAverage: -1}) //* => compounds index

module.exports = mongoose.model('Hotel', HotelSchema);
