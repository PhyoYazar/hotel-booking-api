import User from '../models/User.js';
import APIFeatures from '../utils/apiFeatures.js';
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
