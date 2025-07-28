import express from 'express';
import checkOut from '../Controllers/checkOutController.js'

const router = express.Router();

router.route('/').post(checkOut);

export default router;