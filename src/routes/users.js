const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/:userId/bookings')
  .get(authController.restrictTo('user'), bookingController.getBookings);

// UPDATE MY PASSWORD (as login user)
router.patch('/updateMyPassword', authController.updatePassword);

// GET ME (as login user)
router.get('/me', userController.getMe, userController.getUser);

// UPDATE ME 'patch' (as login user)
router.patch('/updateMe', userController.updateMe);

// DELETE USER (as login user)
router.delete('/deleteMe', userController.deleteMe);

//
router.use(authController.restrictTo('superAdmin'));

// GET ALL ADMIN USERS
router.get('/admin', userController.getAdminUsers, userController.getUsers);

router.route('/').get(userController.getUsers).post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser) // as admin
  .delete(userController.deleteUser); // as admin

module.exports = router;
