// import express from 'express';
// const router = express.Router()

// //import checkObjectId from '../MiddleWare/checkObjectId.js';
// import {products, productById} from '../Controllers/productControl.js'



// router.route('/products').get(products);
// router.route('/products/:id').get(productById);


// export default router;

import express from 'express';
const router = express.Router();
import { products, productById } from '../Controllers/productControl.js';

router.get('/', products);       // GET /api/products
router.get('/:id', productById); // GET /api/products/:id

export default router;
