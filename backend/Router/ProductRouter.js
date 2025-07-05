import express from 'express';
const router = express.Router()
import Product from '../Models/productModel.js';
//import checkObjectId from '../MiddleWare/checkObjectId.js';


router.get('/products', async(req, res) => {
    try {
        const { category } = req.query;
         const categories = Array.isArray(category) ? category : [category];
        if(category){
             const products = await Product.find({category: { $in: categories }});
             res.status(200).json({
                success: true,
                data: products
             })
        }else{
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products // Note the capitalization of "Products"
        });
    }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to load products'
        });
    }
});


router.get('/products/:id', async(req, res) => {
  console.log("✅ hit the single product api");
    try {
        const products = await Product.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: products // Note the capitalization of "Products"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to load Singleproduct'
        });
    }
});


export default router;