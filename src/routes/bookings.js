const express = require('express');

const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('superAdmin'), bookingController.getBookings)
  .post(authController.restrictTo('user'), bookingController.createBooking);

router
  .route('/:id')
  .get(authController.restrictTo('superAdmin'), bookingController.getBooking)
  .patch(authController.restrictTo('user'), bookingController.updateBooking)
  .delete(
    authController.restrictTo('user', 'admin'),
    bookingController.deleteBooking
  );

module.exports = router;
