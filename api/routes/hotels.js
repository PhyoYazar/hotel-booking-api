import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();

// router.get("", getHotels); //GET ALL
// router.get("/:hotel_id", getHotel); //GET
// router.post("", createHotel); //CREATE
// router.put("/:hotel_id", updateHotel); //UPDATE
// router.delete("/:hotel_id", middleware, deleteHotel); //DELETE

router.param("hotel_id", (req, res, next, val) => {
  // console.log(`Hotel id is ${val}`);

  // ERROR CHECKING CODE or validation...

  next();
});

router.route("/").get(getHotels).post(createHotel);

router.route("/:hotel_id").get(getHotel).put(updateHotel).delete(deleteHotel);

export default router;
