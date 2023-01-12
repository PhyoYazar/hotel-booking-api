import Hotel from "../models/Hotel.js";

//GET ALL
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

//GET
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotel_id);
    res.status(200).json({ hotel });
  } catch (err) {
    next(err);
  }
};

//CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.hotel_id,
      {
        $set: req.body,
      },
      { new: true } // to return the updated new value
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.hotel_id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
