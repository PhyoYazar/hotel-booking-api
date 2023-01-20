const express = require('express');

const hotelController = require('../controllers/hotelController');
const authController = require('../controllers/authController');

const router = express.Router();

// const router = express.Router({ mergeParams: true }); =>  in review route
// router.use('/:tourId/reviews', reviewRouter);

router.param('id', (req, res, next, val) => {
  // console.logK(`Hotel id is ${val}`);
  // ERROR CHECKING CODE or validation...
  //
  next();
});

router
  .route('/')
  .get(hotelController.getHotels)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    hotelController.createHotel
  );

router
  .route('/:id')
  .get(hotelController.getHotel)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    hotelController.updateHotel
  )
  .delete(
    authController.protect,
    authController.restrictTo('superAdmin'),
    hotelController.deleteHotel
  );

module.exports = router;
