const User = require('../models/User');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// GET ALL ADMIN USERS MIDDLEWARE
exports.getAdminUsers = async (req, res, next) => {
  req.query.role = 'admin';
  next();
};

// GET LOGIN USER
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// UPDATE USER (as login user)
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});

// DELETE USERS (as login user)
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// CREATE USER
exports.createUser = (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

// GET ALL USERS
exports.getUsers = factory.getAll(User);

// GET USER BY ID
exports.getUser = factory.getOne(User);

// UPDATE USER BY ID (as admin)
//! can update even 'password' and 'active'
exports.updateUser = factory.updateOne(User);

// DELETE USER BY ID (as admin)
//! can delete user permanent, but can't delete [active: false] accounts
exports.deleteUser = factory.deleteOne(User);
