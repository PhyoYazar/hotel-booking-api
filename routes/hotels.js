import express from 'express';
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from '../controllers/hotel.js';

const router = express.Router();

router.route('/').get(getHotels).post(createHotel);

router.route('/:hotel_id').get(getHotel).put(updateHotel).delete(deleteHotel);

export default router;
