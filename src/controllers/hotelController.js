const Hotel = require('../models/Hotel');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

//GET ALL
exports.getHotels = factory.getAll(Hotel);

//GET
exports.getHotel = factory.getOne(Hotel);

//CREATE
exports.createHotel = factory.createOne(Hotel);

//UPDATE
exports.updateHotel = factory.updateOne(Hotel);

//DELETE
exports.deleteHotel = factory.deleteOne(Hotel);
