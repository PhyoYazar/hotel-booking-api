const Booking = require('../models/Booking');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//GET ALL
exports.getBookings = factory.getAll(Booking);

//GET
exports.getBooking = factory.getOne(Booking);

//CREATE
exports.createBooking = catchAsync(async (req, res, next) => {
  if (!req.user.id)
    next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );

  if (req.params.hotelId) req.body.hotel = req.params.hotelId;

  const data = { ...req.body, user: req.user.id };

  const createdBooking = await Booking.create(data);

  res.status(201).json({
    status: 'success',
    data: createdBooking,
  });
});

//UPDATE
exports.updateBooking = factory.updateOne(Booking);

//DELETE
exports.deleteBooking = factory.deleteOne(Booking);
