import Product from "../Models/productModel.js";

export const getProductsByCategory = async (req, res) => {
  const category = req.params.category ? req.params.category.trim() : "";
  //console.log(`✅ hit the filtered products api: ${category}`); // Debug log

  try {
    const products = await Product.find({ category });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ success: false, message: "DB error" });
  }
};
