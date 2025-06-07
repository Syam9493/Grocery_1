import express from 'express';
import Product from '../Models/productModel.js'
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products // Note the capitalization of "Products"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to load products'
        });
    }
});


router.get('/:id', async(req,res) => {
    try {
       const details = await Product.findById(req.params.id);
       //console.log(details);
        res.json({
            success: true,
            data: details
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to load product'
        });
    }
});

router.get('/fruits', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products // Note the capitalization of "Products"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to load products'
        });
    }
});



// router.get('/fruits', async(req,res) => {
//     try {
//         const fruites  = await Product.find({category: 'Fruits'});
//         console.log(fruites);
//         //const fruite = fruites.filter((p) => p.category === 'Fruits')
//         res.status(200).json({
//             success: true,
//             data: fruites
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Product are not found'
//         });
//     }
// });

// // API endpoint to get specific category
// router.get('/api/:category', async (req, res) => {
//     try {
//         const category = req.params.category.toLowerCase();
//         const products = await Product.find({});
        
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


// router.get('/:id', async (req, res) => {
//     try {
//         const id = req.params._id;
//         const productId = parseInt(id);
        
//         // Make sure you have this function defined
//         const products = await Product.find({});
        
//         let foundProduct = null;
        
//         // Search through all categories
//         for (const category in products.Products) {
//             const product = products.Products[category].find(p => p._id === productId);
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



export default router;