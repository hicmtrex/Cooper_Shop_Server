import express from 'express';
import {
  getAllUsers,
  getUserById,
  userLogin,
  userRegister,
} from '../controllers/userControllers.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(userRegister);
router.route('/:id').get(getUserById);
router.route('/login').post(userLogin);

export default router;
