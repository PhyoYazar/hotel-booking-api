import express from "express";

const router = express.Router();

//LOGIN
router.post("/login", (req, res) => {
  res.send("hello this is auth LOGIN endpoint");
});

//SINGUP
router.post("/register", (req, res) => {
  res.send("hello this is auth REGISTER endpoint");
});

export default router;
