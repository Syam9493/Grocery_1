import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  bodyParser from 'body-parser';
dotenv.config();
//import { promises as fs } from 'fs';
import connectDB from './Config/db.js';
import productsRoutes from './Router/ProductRouter.js';
import cartRouter from './Router/cartRouter.js';
import userRouter from './Router/userRouter.js';
import filteredProductsRoutes from './Router/filteredProducts.js'
//import Product from './Router/Product.js';
//import ProductDetails  from './Router/ProductDetails.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Get __dirname equivalent in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


const app = express();
const PORT = 5000; 


connectDB(); //connect to mongodb
app.use(express.json());
app.use(bodyParser.json());



// Or configure specific origins
app.use(cors({
  origin: ['http://localhost:5173'], // Your Vite frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Enable CORS for all routes
app.use(cors());

// Helper function to load products
// async function loadProducts() {
//     try {
//         const filePath = path.join(__dirname, './Data/db.json');
//         const data = await fs.readFile(filePath, 'utf8');
//         return JSON.parse(data);
//     } catch (error) {
//         console.error('Error loading products:', error);
//         throw error;
//     }
// }

// API endpoint to get all products
// app.get('/api/products', async (req, res) => {
//     try {
//         const products = await loadProducts();
//         res.status(200).json({
//             success: true,
//             data: products.Products // Note the capitalization of "Products"
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Failed to load products'
//         });
//     }
// });

app.use('/api', productsRoutes);
app.use('/api/category', filteredProductsRoutes);
app.use('/api/cart', cartRouter);
app.use('/api/user', userRouter);

//app.use('/api/products/fruits', Product)


// // API endpoint to get specific category
// app.get('/api/:category', async (req, res) => {
//     try {
//         const category = req.params.category.toLowerCase();
//         const products = await loadProducts();
        
//         // Handle case sensitivity in your JSON (Fruits vs fruits)
//         const categoryKey = Object.keys(products.Products).find(
//             key => key.toLowerCase() === category
//         );

//         if (!categoryKey) {
//             const available = Object.keys(products.Products).join(', ');
//             return res.status(404).json({
//                 success: false,
//                 message: `Category '${category}' not found. Available: ${available}`
//             });
//         }
        
//         res.json({
//             success: true,
//             data: products.Products[categoryKey]
//         });
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// });

// app.get('/api/productDetailsPage/:id', async(req,res) => {
//         try {
//             const id = req.params.id;
//             const productId = parseInt(id);
//             const products = await loadProducts();
//             let foundProduct = null;
//             for (const category in products.Products) {
//                 const product = products.Products[category].find(p => p.id === productId);
//                 if (product) {
//                   foundProduct = { ...product, category };
//                   break;
//                 }
//                 if (foundProduct) {
//                     res.json(foundProduct);
//                   } else {
//                     res.status(404).json({ error: 'Product not found' });
//                   }
//               }
//             // const productID = Object.values(products.Products.vegetables).filter((Iid) => Iid === MainID )
//             // console.log(productID);
//         //    res.json({
//         //           success: true,
//         //           data: products.Products[productID]
//         //       })
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: 'Server error',
//                 error: error.message
//             });
//         }

    
// })

// app.get('/api/productDetailsPage/:_id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const productId = parseInt(id);
        
//         // Make sure you have this function defined
//         const products = await loadProducts();
        
//         let foundProduct = null;
        
//         // Search through all categories
//         for (const category in products.Products) {
//             const product = products.Products[category].find(p => p.id === productId);
//             if (product) {
//                 foundProduct = { ...product, category };
//                 break; // Exit loop once found
//             }
//         }
        
//         // Check after all categories have been searched
//         if (foundProduct) {
//             res.json({
//                 success: true,
//                 data: foundProduct
//             });
//         } else {
//             res.status(404).json({ 
//                 success: false,
//                 error: 'Product not found' 
//             });
//         }
        
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});