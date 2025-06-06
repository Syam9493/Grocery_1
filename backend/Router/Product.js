import express from 'express';
import Product from '../Models/productModel.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const fruits = await Product.find({ category: 'Fruits' }); // Only fetch Fruits
    res.status(200).json({
      success: true,
      data: fruits,
    });
  } catch (error) {
    console.error('Error fetching fruits:', error.message); // Log actual error
    res.status(500).json({
      success: false,
      message: 'Products not found',
    });
  }
});


export default router;