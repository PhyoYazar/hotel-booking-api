const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'User must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Username must have less or equal than 40 characters'],
      minlength: [4, 'Username must have more or equal than 4 characters'],
      // 'maxlength' and 'minlength' validating only work for 'String'
    },

    email: {
      type: String,
      required: [true, 'User must have a email'],
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other', 'prefer not to say'],
        message:
          'Gender value must be male, female, other or prefer not to say',
      },
    },

    type: {
      type: String,
    },
    secretMember: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    // rating: {
    //   type: Number,
    //   min: [1, 'Rating must be above 1.0'],
    //   max: [5, 'Rating must be below 5.0'],
    //?   // 'min' and 'max' not only work for 'Number', also work for 'Date'
    // },

    // difficult: {
    //   type: String,
    //   enum: {
    //     values: ['easy', 'medium', 'difficult'],
    //     message: 'Difficult value must be easy, medium or difficult',
    //   },
    // },

    // price: {
    //   type: Number,
    //   required: [true, 'Room must have a price'],
    // },
    // priceDiscount: {
    //   type: Number,
    //?   // Custom Validator only work for document creation, not for UPDATE
    //   validate: {
    //     validator: function (val) {
    //       return val < this.price;
    //     },
    //     message: 'Discount price ({VALUE}) should be below regular price',
    //   },
    // },

    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    //   select: false        //don't allow to select 'createdAt' from outside
    // },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual Property
UserSchema.virtual('ability').get(function () {
  return this.isAdmin
    ? ['Create', 'Read', 'Update', 'Delete']
    : ['Create', 'Read', 'Update'];
});

// DOCUMENT MIDDLEWARE
// "pre" run before only .save() and .create() | not work in UPDATE
UserSchema.pre('save', function (next) {
  this.type = this.isAdmin ? 'Admin' : 'User';
  next();
});

// UserSchema.pre('save', function (next) {
//   console.log('...Will save document middleware...');
//   next();
// });

// DOCUMENT MIDDLEWARE: "post" run after all "pre" middleware
// UserSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// UserSchema.pre('find', function (next) {
UserSchema.pre(/^find/, function (next) {
  this.find({ secretMember: { $ne: true } });
  this.start = Date.now();
  next();
});

UserSchema.post(/^find/, function (doc, next) {
  console.log(`Query middleware took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
// UserSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretMember: { $ne: true } } });
//   next();
// });

module.exports = mongoose.model('User', UserSchema);
