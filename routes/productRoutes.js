import express from 'express';
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getRandomProducts,
  getTopProducts,
} from '../controllers/productControllers.js';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/random').get(getRandomProducts);
router.route('/top-product').get(getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .post(updateProduct)
  .delete(deleteProduct);

export default router;
