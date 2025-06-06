import express from 'express';
import Cart from '../Models/cartModel.js';

const router = express.Router();


router.get('/', async(req,res) => {
    try {
        const cartinfo = Cart.find({});
        res.status(200).json({
            success: true,
            data: cartinfo
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cart items are empty'
        });
    }
});



export default router;