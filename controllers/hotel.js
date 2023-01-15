import Hotel from '../models/Hotel.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

//GET ALL
export const getHotels = catchAsync(async (req, res, next) => {
  // REUSEABLE API FEATURES
  const features = new APIFeatures(Hotel, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const hotels = await features.query;

  // SEND RESPONSE
  res
    .status(200)
    .json({ status: 'success', results: hotels.length, data: hotels });
});

//CREATE
export const createHotel = catchAsync(async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  const savedHotel = await newHotel.save(); // create first and save to db
  // const saveHotel = await Hotel.create(req.body); // create on db

  res.status(201).json({ status: 'success', data: savedHotel });
});

//GET
export const getHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.hotel_id);

  if (!hotel) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: hotel });
});

//UPDATE
export const updateHotel = catchAsync(async (req, res, next) => {
  const updatedHotel = await Hotel.findByIdAndUpdate(
    req.params.hotel_id,
    // PUT
    {
      $set: req.body,
    },
    // req.body, // only work on PATCH method
    {
      new: true, // to return the updated new value
      runValidators: true, // to apply Schema validator for 'UPDATE'
    }
  );

  if (!updatedHotel) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: updatedHotel });
});

//DELETE
export const deleteHotel = catchAsync(async (req, res, next) => {
  const deletedHotel = await Hotel.findByIdAndDelete(req.params.hotel_id);

  if (!deletedHotel) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  res
    .status(200)
    .json({ status: 'success', message: 'Hotel has been deleted.' });
});
