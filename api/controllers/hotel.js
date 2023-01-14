import Hotel from '../models/Hotel.js';

//GET ALL
export const getHotels = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    const query = Hotel.find(queryObj);

    // example
    // const query = await Hotel.find();

    const hotels = await Hotel.find();
    res
      .status(200)
      .json({ status: 'success', results: hotels.length, data: hotels });
  } catch (err) {
    next(err);
  }
};

//GET
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotel_id);
    res.status(200).json({ status: 'success', data: hotel });
  } catch (err) {
    next(err);
  }
};

//CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save(); // create first and save to db
    // const saveHotel = await Hotel.create(req.body); // create on db

    res.status(201).json({ status: 'success', data: savedHotel });
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.hotel_id,
      // PUT
      {
        $set: req.body,
      },
      // req.body, // only work on PATCH method
      { new: true } // to return the updated new value
    );
    res.status(200).json({ status: 'success', data: updatedHotel });
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.hotel_id);
    res
      .status(200)
      .json({ status: 'success', message: 'Hotel has been deleted.' });
  } catch (err) {
    next(err);
  }
};
