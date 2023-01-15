import express from 'express';
import { getUser, getUsers } from '../controllers/user.js';

const router = express.Router();

//GET ALL
router.route('/').get(getUsers);

//GET
router.route('/:user_id').get(getUser);

//CREATE
//UPDATE
//DELETE

export default router;
