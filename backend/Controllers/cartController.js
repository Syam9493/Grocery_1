import Cart from "../Models/cartModel.js";
import mongoose from 'mongoose';

const getCart = async (req, res) => {
  try {
    const userId = req.params.userID;
//     console.log("Route hit:", req.originalUrl);
// console.log("Params:", req.params);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });

  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: error.message });
  }
};


 const updateCart = async (req, res) => {
  try {
    const user = req.params.userID;
    const  product  = req.body;
   //console.log("Getting data from frontend:", product.image);
   

   const cartItem = {
  productID: product._id,          // ✅ REQUIRED
  name: product.name,
  image: product.image,              // image is an array in your data
  price: product.price,
  quantity: product.quantity,
  weight: product.weight,          // ✅ REQUIRED
  subtotal: product.price,
};



console.log(cartItem);

    if (!user || !cartItem  || cartItem .length === 0) {
      return res.status(400).json({ message: 'Missing required cart data' });
    }

    
    
let existingCart = await Cart.findOne({ user });

if (!existingCart) {
  const newCart = await Cart.create({
    user,
   cartItems: [cartItem],
  });
  return res.status(201).json({ message: 'Cart created', cart: newCart });
}


  const existingItem = existingCart.cartItems.find(
    (item) => item.name === cartItem.name
  );

  if (existingItem) {
    existingItem.quantity += cartItem.quantity;
    existingItem.subtotal += cartItem.subtotal;
  } else {
    existingCart.cartItems.push(cartItem);
  }

  const totalItems = existingCart.cartItems.reduce(
  (acc, item) => acc + item.quantity,
  0
);


const subtotal = existingCart.cartItems.reduce(
  (acc, item) => acc + item.subtotal,
  0
);

// Update cart totals
existingCart.totalItems = totalItems;
existingCart.subtotal = subtotal;
existingCart.shippingcost = existingCart.subtotal/10;
existingCart.taxes = existingCart.subtotal /10;
existingCart.total =  existingCart.subtotal + existingCart.shippingcost + existingCart.taxes
await existingCart.save();

res.status(200).json({ message: 'Cart updated', cart: existingCart });

  } catch (error) {
    console.error('Cart Create Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Quantity update


// const updateQuantityExistItem = async (req, res) => {
//   console.log(req.body);
//   try {
//     const user = req.params.userID;
//     const { productID, quantity } = req.body;

//     //const  productIDs = String(productID);

//     console.log('Request body:', productID);

//     // ✅ Use findOne to get a single cart document
//     const cart = await Cart.findOne({ user });

//     // ✅ Check if cart and cartItems exist
//     if (!cart || !cart.cartItems) {
//       return res.status(404).json({ message: 'Cart or user not found!' });
//     }

//     // ✅ Find the existing product in the cart
//     // const existingItem = cart.cartItems.find(
//     //   (item) => item.productID.toString() == productID
//     // );
// const existItem = cart.cartItems.find((item) =>
//       item.productID.equals(new mongoose.Types.ObjectId(productID))
//     );
     
//     console.log('ExistItem:',existingItem);

//     if (!existingItem) {
//       return res.status(404).json({ message: 'Product not found in cart!' });
//     }

//     // ✅ Update the quantity and subtotal
//     existingItem.quantity += quantity;
//     existingItem.subtotal = existingItem.quantity * existingItem.price;

//     // ✅ Recalculate totals
//     cart.totalItems = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
//     cart.subtotal = cart.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
//     cart.taxes = Math.round(cart.subtotal * 0.1);
//     cart.shippingcost = Math.round(cart.subtotal / 10);
//     cart.total = cart.subtotal + cart.taxes + cart.shippingcost;

//     await cart.save();

//     return res.status(200).json({
//       message: 'Cart quantity updated successfully',
//       cart,
//     });
//   } catch (error) {
//     console.error("Error updating quantity:", error);
//     return res.status(500).json({ message: error.message || 'Internal server error' });
//   }
// };

const updateQuantityExistItem = async (req, res) => {
  console.log(req.body);
  try {
    const user = req.params.userID;
    const { productID, quantity } = req.body;

    console.log('Request body:', productID);

    // ✅ Use findOne to get a single cart document
    const cart = await Cart.findOne({ user });

    // ✅ Check if cart and cartItems exist
    if (!cart || !cart.cartItems) {
      return res.status(404).json({ message: 'Cart or user not found!' });
    }

    cart.cartItems.forEach(item => {
  console.log('Cart item productID:', item.productID.toString());
});

    // ✅ Find the existing product in the cart
   const existingItem = cart.cartItems.find((item) =>
  item.productID.toString() === productID.trim()
);

    console.log('ExistingItem:', existingItem);

    if (!existingItem) {
      return res.status(404).json({ message: 'Product not found in cart!' });
    }

    // ✅ Update the quantity and subtotal
    existingItem.quantity = quantity;
    existingItem.subtotal = quantity * existingItem.price;

    // ✅ Recalculate totals
    cart.totalItems = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cart.subtotal = cart.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    cart.taxes = Math.round(cart.subtotal * 0.05);
    cart.shippingcost = Math.round(Number(cart.subtotal / 10));
    cart.total = cart.subtotal + cart.taxes + cart.shippingcost;

    await cart.save();

    return res.status(200).json({
      message: 'Cart quantity updated successfully',
      cart,
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
};




const deletItemFromCart = async(req, res) => {
  
  try {
  const user = req.params.userID;
  const {itemID} = req.body;


  let cart = await Cart.findOne({user})
 
  if(!cart){
    res.status(404).json({
      message: 'Incorrect user ID or product ID'
    })
  }

  cart.cartItems = cart.cartItems.filter(
      (item) => item.productID.toString() !== itemID.trim()
    );

     console.log(cart.cartItems);

   cart.totalItems = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cart.subtotal = cart.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    cart.taxes = Math.round(cart.subtotal * 0.1);
    cart.shippingcost = cart.subtotal/10;
    cart.total = cart.subtotal + cart.taxes + cart.shippingcost;

   await cart.save();

  res.status(400).json({
    cart
  }) }
    catch (error) {
      res.status(500).json({
        message: "internal server error"
      })
  }
  }



export {getCart, updateCart,updateQuantityExistItem, deletItemFromCart}