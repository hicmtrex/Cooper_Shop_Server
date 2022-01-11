import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  fullName: { type: String, require: true },
  image: { type: String, require: true },
  thumbnail: { type: String, default: '/images/hp-i5.jpg' },
  price: { type: Number, require: true },
  rating: { type: Number, default: 1 },
  brand: { type: String, require: true },
  description: { type: String, require: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    require: true,
  },
  specifications: [String],
});
const Product = mongoose.model('Product', productSchema);

export default Product;
