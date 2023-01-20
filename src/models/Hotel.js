const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotel must have a name'],
      trim: true,
      unique: true,
      maxlength: [
        40,
        'A hotel name must have less or equal then 40 characters',
      ],
      minlength: [2, 'A hotel name must have more or equal then 2 characters'],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // rating: {
    //   type: Number,
    //   min: [1, 'Rating must be above 1.0'],
    //   max: [5, 'Rating must be below 5.0'],
    //   // 'min' and 'max' not only work for 'Number', also work for 'Date'
    // },

    roomType: [
      {
        type: {
          type: String,
          default: '1P',
          enum: ['1P', '2P', '3P', '4P', '5P', '6P', '7P'],
        },
        totalRooms: {
          type: Number,
          required: [true, 'Hotel must have total rooms of room type'],
          min: [1, 'Hotel must have at least one Room'],
        },
        price: {
          type: Number,
          required: [true, 'Room must have price'],
        },
      },
    ],

    phoneNumber: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', HotelSchema);
