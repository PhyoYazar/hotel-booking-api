const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },

    hotel: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hotel',
      required: true,
    },

    phoneNumber: {
      type: [String],
      required: true,
    },

    bookingDate: {
      type: Date,
      required: [true, 'Booking must have Date'],
    },

    bookingRooms: {
      type: [
        {
          type: {
            type: String,
            required: true,
            enum: ['1P', '2P', '3P', '4P', '5P', '6P', '7P'],
          },
          totalBookings: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      required: [true, 'Making a booking must take room.'],
    },
  },
  { timestamps: true }
);

// {'bookingRooms': {
//   $elemMatch : {
//       'type' : '1P'
//   }
// }}

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
