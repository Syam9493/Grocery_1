import Product from '../Models/productModel.js'

const products =  async (req, res) => {
    try {
        const products = await Product.find({});
        console.log(products);
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
};

const productById =  async(req,res) => {
    console.log(req.params.id);
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
};

export {products, productById};