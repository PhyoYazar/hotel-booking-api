import express from "express";

const router = express.Router();

//GET ALL
router.get("", (req, res) => {
  res.send("hello this is ROOMS endpoint");
});

//GET
//CREATE
//UPDATE
//DELETE

export default router;
