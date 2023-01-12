import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

//SINGUP
router.post("/register", register);

//LOGIN
router.post("/login", login);

export default router;
