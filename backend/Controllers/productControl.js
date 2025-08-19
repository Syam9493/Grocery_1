import Product from "../Models/productModel.js";

// Get all products
// api/products
// get request

const products = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { category: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    // const category = req.query.categories
    //   ? { category : { $in: req.query.categories.split(',') } || {price: { $in: req.query.categories.split(',')[1] }} }
    //   : {};

    let category = { $and: [] };

    if (req.query.categories) {
      let filters = [];
      try {
        filters = JSON.parse(req.query.categories); // decode JSON array
      } catch (err) {
        console.error("Invalid categories JSON", err);
      }

      filters.forEach((f) => {
        switch (f.type) {
          case "category":
            category.$and.push({ category: { $in: [f.value] } });
            break;

          case "price":
            category.$and.push({ price: { $gte: Number(f.value) } });
            break;

          case "rating":
            category.$and.push({ rating: { $gte: Number(f.value) } });
            break;
          case "brand":
            category.$and.push({ brand: { $in: [f.value] } });
            break;
          case "Product Type":
            category.$and.push({ productType: { $in: [f.value] } });
            break;
          case "Availability":
            category.$and.push({ Availability: f.value });
            break;
        }
      });
    }

    if (category.$and.length === 0) {
      category = {};
    }

    const filters = { ...keyword, ...category };

    const total = await Product.countDocuments(filters);
    //console.log(total); // debug log

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
      message: "Failed to load products",
    });
  }
};

// get product by ID
// api/products/:id
// get request

const productById = async (req, res) => {
  //console.log("✅ hit the single product api"); Debug log
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: products, // Note the capitalization of "Products"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load Singleproduct",
    });
  }
};

export { products, productById };
