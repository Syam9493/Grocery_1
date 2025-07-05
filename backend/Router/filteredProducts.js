import express from 'express';
const router = express.Router()
import Product from '../Models/productModel.js'


router.get('/:category', async (req, res) => {
  const category = req.params.category.trim();
  console.log(`✅ hit the filtered products api:${category}`);
  try {
    const products = await Product.find({ category });
    res.json({ success: true, data: products });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ success: false, message: 'DB error' });
  }
});


export default router;