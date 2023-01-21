const express = require('express');

const hotelController = require('../controllers/hotelController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// const router = express.Router({ mergeParams: true }); =>  in review route
// router.use('/:tourId/reviews', reviewRouter);

router
  .route('/')
  .get(hotelController.getHotels)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    hotelController.createHotel
  );

router.use(authController.protect);

router
  .route('/:hotelId/bookings')
  .get(authController.restrictTo('admin'), bookingController.getBookings)
  .post(authController.restrictTo('user'), bookingController.createBooking);

router
  .route('/:id')
  .get(hotelController.getHotel)
  .patch(authController.restrictTo('admin'), hotelController.updateHotel)
  .delete(authController.restrictTo('superAdmin'), hotelController.deleteHotel);

module.exports = router;
