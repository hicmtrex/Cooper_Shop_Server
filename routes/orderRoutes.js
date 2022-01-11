import express from 'express';
import {
  getOrders,
  createOrder,
  getOrderById,
  getUserOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').get(getOrders).post(createOrder);
router.route('/user/:id').get(getUserOrder);
router.route('/:id').get(getOrderById);

export default router;
