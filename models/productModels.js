import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  fullName: { type: String, require: true },
  image: { type: String, require: true },
  price: { type: Number, require: true },
  rating: { type: Number, default: 1 },
  brand: { type: String, require: true },
  description: { type: String, require: true },
  category: { type: String, require: true },
  specifications: [String],
});
const Product = mongoose.model('Product', productSchema);

export default Product;
