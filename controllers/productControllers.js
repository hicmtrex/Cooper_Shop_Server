import asyncHandler from 'express-async-handler';
import Product from '../models/productModels.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error('Products not found!...');
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('product not found!...');
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    fullName,
    image,
    price,
    rating,
    brand,
    description,
    category,
    specifications,
  } = req.body;

  const product = new Product({
    name,
    fullName,
    image,
    price,
    rating,
    brand,
    description,
    category,
    specifications,
  });

  if (product) {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } else {
    res.status(400);
    throw new Error('Something wrong!...');
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    fullName,
    image,
    price,
    rating,
    brand,
    description,
    category,
    specifications,
  } = req.body;

  let product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.fullName = fullName;
    product.image = image;
    product.price = price;
    product.rating = rating;
    product.brand = brand;
    product.description = description;
    product.category = category;
    product.specifications = specifications;

    product = await product.save();
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error('Something went wrong!...');
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('product not found!...');
  }
});

export const getRandomProducts = asyncHandler(async (req, res) => {
  const randomProducts = await Product.aggregate([{ $sample: { size: 5 } }]);

  if (randomProducts) {
    res.status(200).json(randomProducts);
  } else {
    res.status(404);
    throw new Error('product not found!...');
  }
});

export const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(5);

  if (topProducts) {
    res.status(200).json(topProducts);
  } else {
    res.status(404);
    throw new Error('product not found!...');
  }
});
