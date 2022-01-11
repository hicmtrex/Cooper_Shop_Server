import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { cartItems, shippingAddress, totalPrice } = req.body;

  const order = new Order({
    user: req.body.user,
    cartItems,
    shippingAddress,
    totalPrice,
  });

  if (order) {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } else {
    res.status(404);
    throw new Error('Something went wrong...');
  }
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error('orders not found');
  }
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});

export const getUserOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.params.id });

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});
