import express from 'express';
import { getUsers } from '../controllers/user.js';

const router = express.Router();

//GET ALL
router.route('/').get(getUsers);

//GET
//CREATE
//UPDATE
//DELETE

export default router;
