import wishList from "../Models/wishListModel.js";

// Get user wishlist
// /api/wishlist/:userID
// GET Request

const getUserWishList = async (req, res) => {
  const { userID } = req.params;

  try {
    const wishListItem = await wishList.findOne({ userID });

    if (!wishListItem) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({ wishList: wishListItem });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add product to wishlist
// /api/wishlist/:userID
// POST Request

const addToWishList = async (req, res) => {
  //console.log(req.body); Debug log
  try {
    const { userID } = req.params;
    const product = req.body;

    if (!userID || !product?._id) {
      return res
        .status(400)
        .json({ message: "Missing required userID or product data" });
    }

    const cartItem = {
      productID: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: product.quantity || 1, // Default quantity if not provided
      weight: product.weight,
      subtotal: product.price * (product.quantity || 1), // Calculate actual subtotal
    };

    // Check for existing wishlist
    let wishListItem = await wishList.findOne({ userID });

    // If no wishlist exists, create one
    if (!wishListItem) {
      const newItem = await wishList.create({
        userID,
        products: [product],
      });
      return res.status(201).json({
        wishList: newItem,
        message: "Product added to wishlist",
      });
    }

    // Check if product already exists in wishlist
    const productExists = wishListItem.products.some(
      (item) => item.productID.toString() === cartItem.productID.toString()
    );

    if (productExists) {
      return res.status(409).json({
        message: "Product already in wishlist",
        wishList: wishListItem,
      });
    }

    // Add new product to existing wishlist
    wishListItem.products.push(cartItem);
    const updatedWishlist = await wishListItem.save();

    return res.status(200).json({
      wishList: updatedWishlist,
      message: "Product added to wishlist",
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);

    // Handle specific errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete product from wishlist
// /api/wishlist/:userID
// DELETE Request

const deleteFromWishList = async (req, res) => {
  try {
    const { userID } = req.params;
    const { productID } = req.body; // Fixed destructuring here
    //console.log("Deleting product from wishlist:", productID); // Now logs just the ID

    if (!userID || !productID) {
      return res.status(400).json({ message: "Missing required data" });
    }

    const userWishlist = await wishList.findOne({ userID });

    if (!userWishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Convert both IDs to string for comparison
    const initialCount = userWishlist.products.length;
    userWishlist.products = userWishlist.products.filter(
      (item) => item.productID.toString() !== productID.toString()
    );

    if (userWishlist.products.length === initialCount) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    const savedWishlist = await userWishlist.save();
    return res.status(200).json({
      message: "Product removed successfully",
      wishList: savedWishlist,
    });
  } catch (error) {
    console.error("Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { getUserWishList, addToWishList, deleteFromWishList };
