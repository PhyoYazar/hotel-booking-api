const Booking = require('../models/Booking');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

//GET ALL
exports.getBookings = factory.getAll(Booking);

//GET
exports.getBooking = factory.getOne(Booking);

//CREATE
exports.createBooking = factory.createOne(Booking);

//UPDATE
exports.updateBooking = factory.updateOne(Booking);

//DELETE
exports.deleteBooking = factory.deleteOne(Booking);
