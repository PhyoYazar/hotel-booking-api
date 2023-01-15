import User from '../models/User.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const getUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  // SEND RESPONSE
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.user_id);

  if (!user) return next(new AppError('No user found with that ID'));

  // SEND RESPONSE
  res.status(200).json({ status: 'success', data: user });
});
