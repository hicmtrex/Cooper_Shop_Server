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
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/random').get(getRandomProducts);
router.route('/top-product').get(getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(protect, deleteProduct);

export default router;
