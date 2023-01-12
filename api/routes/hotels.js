import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();

//GET ALL
router.get("", getHotels);

//GET
router.get("/:hotel_id", getHotel);

//CREATE
router.post("", createHotel);

//UPDATE
router.put("/:hotel_id", updateHotel);

//DELETE
router.delete("/:hotel_id", deleteHotel);

export default router;
