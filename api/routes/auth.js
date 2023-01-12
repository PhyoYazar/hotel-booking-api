import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("hello this is auth LOGIN endpoint");
});

router.get("/register", (req, res) => {
  res.send("hello this is auth REGISTER endpoint");
});

export default router;
