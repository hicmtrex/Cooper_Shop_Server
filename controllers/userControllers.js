import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(500);
    throw new Error('User already exist');
  }

  let user = new User({ username, email, password });

  if (user) {
    user = await user.save();
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error('Something went wrong...');
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password, user.password))) {
    res.status(200);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Email or password i wrong');
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error('Users not found!');
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('user not found!');
  }
});
