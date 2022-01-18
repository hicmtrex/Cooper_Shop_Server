import colors from 'colors';
import dotenv from 'dotenv';
import connectDb from '../config/db.js';
import Product from '../models/productModels.js';
import { products } from './products.js';

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await Product.deleteMany();
    //  await Category.deleteMany();

    await Product.insertMany(products);
    // await Category.insertMany(category);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

export default importData();
