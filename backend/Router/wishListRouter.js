import express from 'express';
import {getUserWishList, addToWishList, deleteFromWishList} from '../Controllers/wishListController.js';

const router = express.Router();

router.route('/:userID').get(getUserWishList).post(addToWishList).delete(deleteFromWishList);

export default router;
