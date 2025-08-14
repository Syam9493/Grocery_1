import express from 'express';


//import Cart from '../Models/cartModel.js';
import {getCart,updateCart,updateQuantityExistItem, deletItemFromCart} from '../Controllers/cartController.js';

const router = express.Router();


router.route('/:userID').get(getCart).post(updateCart).put(updateQuantityExistItem).delete(deletItemFromCart);

export default router;



