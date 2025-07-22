import Product from '../Models/productModel.js';
//import searchParameter from '../utilities/serch.js';

// const products =   async(req, res) => {
//     try {

//        const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: 'i'}} : {} ;
        
//        console.log(keyword);
 
//        if(keyword){
//         const products = await Product.find(keyword);
//         res.status(200).json({
//             success: true,
//             data: products
//         })
//        }

//         const  category  = req.body;
//         console.log(category);
//          //const categories = Array.isArray(category) ? category : [category];
//         if(category){
//              const products = await Product.find({category: { $in: category }});
//              res.status(200).json({
//                 success: true,
//                 data: products
//              })
//         }else{
//         const products = await Product.find({});
//         res.status(200).json({
//             success: true,
//             data: products // Note the capitalization of "Products"
//         });
//     }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Failed to load products'
//         });
//     }
// }

const products = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

   const keyword = req.query.keyword
  ? {
      $or: [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { category: { $regex: req.query.keyword, $options: 'i' } },
      ],
    }
  : {};

    const category = req.query.categories
      ? { category: { $in: req.query.categories.split(',') } }
      : {};

    const filters = { ...keyword, ...category };

    const total = await Product.countDocuments(filters);

    const products = await Product.find(filters)
      .limit(limit)
      .skip(limit * (page - 1));

    res.status(200).json({
      success: true,
      data: products,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load products',
    });
  }
};



// const products = async (req, res) => {
//   try {
//     const { keyword, categories } = req.query;

//     // Search logic
//     let searchFilter = {};
//     if (keyword) {
//       searchFilter.name = { $regex: keyword, $options: 'i' };
//     }

//     // Category filter logic
//     let categoryFilter = {};
//     if (categories) {
//       const categoryArray = categories.split(','); // assuming categories is comma-separated string
//       categoryFilter.category = { $in: categoryArray };
//     }

//     // Combine filters
//     const filters = { ...searchFilter, ...categoryFilter };

//     const products = await Product.find(filters);
//     res.status(200).json({ success: true, data: products });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to load products' });
//   }
// };

const productById =  async(req, res) => {
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
}

// const searchProducts =  async (req, res) {

// }

export {products, productById};