// import React,{useState,useContext} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaAngleLeft, FaAngleRight  } from "react-icons/fa6";

// //import 'react-toastify/dist/ReactToastify.css';
// import { addingToCart } from "../Slice/cartSlice";
// import { addToWishList } from "../Slice/WhishListSlice";
// import { IoMdHeartEmpty } from "react-icons/io";

// //import { increaseQty, decreaseQty } from "../Slice/cartSlice";
// //import {showSuccessMessage} from './TostNotifications/successNotification';
// //import Quantity from "./Quantity";
// import { ProductContext } from '../Screens/ProductDetailsScreen';
// import {useUpdateUserCartMutation} from '../ApiSlice/cartApi.js';
// //import Quantity from "./Quantity";
// //import {useGetUserCartQuery} from '../ApiSlice/cartApi.js';



// const ProductDetails = () => {
//   const {product} = useContext(ProductContext);
    
      

//    const [icount,setIcount] = useState(0);

//     const userInfo = useSelector((state) => state.userInfo);

//   // const cart = useSelector((state) => state.cart);
//   // const { cartItems } = cart;

//   // const finalCount = cartItems.filter((p) => p._id === product._id);

//   //console.log(finalCount);

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   //const [qty, setQty] = useState(1);

//   //console.log(product._id);
 

// const [updateUserCart] = useUpdateUserCartMutation();

// const addToCartHandler = async (product) => {
//   const userID = userInfo?.user.id;
//   console.log(userID)
 

//   if (!userID) {
//     toast.error("Please log in to add items to your cart.");
//     return;
//   }

//   try {
//     const result = await updateUserCart( {userID, product} ).unwrap();
//     console.log('Cart Updated:', result);

//     console.log(product);

//     dispatch(addingToCart(product));

//     toast.success("Product added to cart!", {
//       autoClose: 500,
//       position: "top-right",
//       theme: "colored",
//     });

//   } catch (err) {
//     console.error("Cart Update Failed:", err);
//     toast.error("Failed to add product to cart.");
//   }
// };


//   const addToWhishList = () => {
//     dispatch(addToWishList(product));
//     toast.success("Product added to whishList !", {
//       position: "top-right",
//       autoClose: 1000,
//       theme: "colored",
//     });
//     setTimeout(() => {
//       navigate("/whishList");
//     }, 2000);
//   };

//   // const increaseQtyHandler = (id) => {
//   //   dispatch(increaseQty(id));
//   // };

//   // const increaseQtyHandler = (id) => {
//   //   dispatch(increaseQty(id));
//   // };

//   // const decreaseQtyHandler = (id) => {
//   //   dispatch(decreaseQty(id));
//   // };


//   const handleNext = () => {
//     if (icount < product.data.image.length - 1) {
//       setIcount(icount + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (icount > 0) {
//       setIcount(icount - 1);
//     }
//   };

//   return (
//     <>
//       <div className="p-4 w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6">
//   {/* LEFT SIDE: Image Section */}
//   <div className="w-full lg:w-1/2">
//     {/* <div className="relative w-full md:h-[400px] aspect-square bg-white rounded-2xl shadow-md overflow-hidden">
//       <button
//         className="absolute left-2 top-1/2 -translate-y-1/2 bg-yellow-500 text-white hover:bg-white hover:text-yellow-500 rounded-full p-2 z-10"
//         onClick={handlePrev}
//       >
//         <FaAngleLeft />
//       </button>

//       <div className="p-6">
//         <img
//           src={product.data.image[icount]}
//           alt={`Product ${icount}`}
//           className="w-full object-contain"
//         />
//       </div>

//       <button
//         className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-700 text-white hover:bg-white hover:text-green-700 rounded-full p-2 z-10"
//         onClick={handleNext}
//       >
//         <FaAngleRight />
//       </button>
//     </div> */}

//     <div className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[500px] bg-white rounded-2xl shadow-md p-4 mx-auto">
//   <div className="relative w-full md:h-[400px] aspect-square overflow-hidden rounded-xl">
    
//     <button
//       className={`absolute left-2 top-1/2 -translate-y-1/2 ${icount === 0 ? "bg-gray-200" : "bg-yellow-500"} text-white hover:bg-white hover:text-yellow-500 rounded-full p-2 z-10`}
//       onClick={handlePrev}
//       disabled={icount === 0}
//     >
//       <FaAngleLeft />
//     </button>
//     <div className="p-10">
//     <img
//       src={product.data.image[icount]}
//       alt={`Product ${icount}`}
//       className="bg-white backdrop-blur-3xl w-full h-full object-contain"
//       />
//       </div>

//     <button
//       className={`absolute right-2 top-1/2 -translate-y-1/2 ${icount === product.data.image.length - 1 ? 'bg-gray-200' : 'bg-green-700'} text-white hover:bg-white hover:text-green-700 rounded-full p-2 z-10`}
//       onClick={handleNext}
//       disabled={ icount === product.data.image.length - 1}
//     >
//       <FaAngleRight />
//     </button>

//   </div>
// </div>

//     {/* Thumbnail Gallery */}
//     <div className="flex flex-wrap justify-center gap-2 mt-4">
//       {product.data.image.map((img, index) => (
//         <img
//           key={index}
//           src={img}
//           onClick={() => setIcount(index)}
//           className={`w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-lg cursor-pointer border-2 ${
//             icount === index ? 'border-green-500 border-4' : 'border-gray-300'
//           }`}
//           alt={`Thumbnail ${index}`}
//         />
//       ))}
//     </div>
//   </div>

//   {/* RIGHT SIDE: Product Info */}
//   <div className="w-full lg:w-1/2">
//     <div className="space-y-4">
//       <h2 className="text-sm font-semibold text-gray-500">{product.data.category}
//       </h2>
//        <div className="flex flex-row gap-2.5">
//       <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.data.name}</h1>
//        <h1 className={`border ${product?.data?.Availablility === 'In Stock' ? "border-green-700 bg-green-100  text-green-700" : "border-red-700 bg-red-300 text-red-700 "} text-sm font-semibold rounded-3xl px-6 py-1.5`}>{product?.data?.Availablility
//  || 'out of Stock'}</h1>
//  </div>
//       <p className="text-lg">⭐⭐⭐⭐⭐ <span>{product.data.rating}</span></p>
//       <p className="text-xl font-semibold text-green-700">₹ {product.data.price}</p>
//       <p className="text-gray-700">{product.data.description}</p>

//       {/* Weight Options */}
//       <div>
//         <h3 className="font-semibold mb-2">Weight</h3>
//         <div className="flex gap-2 flex-wrap">
//           {[1, 2, 3, 4].map((w) => (
//             <button
//               key={w}
//               className="px-4 py-1 border border-gray-300 rounded-md hover:bg-green-100"
//             >
//               {product.data.weight}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Quantity and Actions */}
//       <div className="flex flex-wrap gap-4 items-center mt-4">
//         <button
//           className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800"
//           onClick={() => addToCartHandler(product.data)}
//         >
//           Add To Cart
//         </button>
//         <button className="bg-yellow-400 px-6 py-2 rounded-full hover:bg-yellow-300">
//           Buy Now
//         </button>
//         <button
//           className="bg-gray-100 text-gray-700 p-3 rounded-full hover:bg-red-100"
//           onClick={addToWhishList}
//         >
//           <IoMdHeartEmpty />
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
//     </>
//   );
// };

// export default ProductDetails;

import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BsSuitHeartFill } from "react-icons/bs";
import { addingToCart } from "../Slice/cartSlice";
import { ProductContext } from '../Screens/ProductDetailsScreen';
import { useUpdateUserCartMutation } from '../ApiSlice/cartApi.js';
import useAuthUser from "../Hooks/useAuthUser.js";
import useWishlistActions from "../Hooks/useWishlistActions.js";

const ProductDetails = ({wishListItems}) => {
  const { product } = useContext(ProductContext);
  const [icount, setIcount] = useState(0);
  const { userID } = useAuthUser(); 
  const { handleAddToWishlist, handleRemoveFromWishlist } = useWishlistActions();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserCart] = useUpdateUserCartMutation();

  
  const items = wishListItems?.wishList?.products || [];
   const isInWishlist = items.some(
    (item) => item.productID === product.data._id
  );


  if (!product) {
    return <div className="p-4 text-center">Loading product details...</div>;
  }

  if (!product.data || !product.data.image || !Array.isArray(product.data.image)) {
    return <div className="p-4 text-center text-red-500">Invalid product data</div>;
  }

  const addToCartHandler = async (productData) => {
    if (!productData) {
      toast.error("Invalid product data");
      return;
    }

    if (!userID) {
      toast.error("Please log in to add items to your cart.");
      navigate('/login');
      return;
    }

    try {
      const result = await updateUserCart({ userID, product: productData }).unwrap();
      console.log(result);
      dispatch(addingToCart(productData));
      toast.success("Product added to cart!", {
        autoClose: 500,
        position: "top-right",
        theme: "colored",
      });
    } catch (err) {
      console.error("Cart Update Failed:", err);
      toast.error(err.data?.message || "Failed to add product to cart.");
    }
  };

  

  const addToWhishList = async (product) => {
   if (isInWishlist) {
      handleRemoveFromWishlist(product._id);
    } else {
      handleAddToWishlist(product);
    }
  };

  const handleNext = () => {
    if (icount < product.data.image.length - 1) {
      setIcount(icount + 1);
    }
  };

  const handlePrev = () => {
    if (icount > 0) {
      setIcount(icount - 1);
    }
  };

  const currentImage = product.data?.image?.[icount] || '';
  const category = product.data?.category || '';
  const name = product.data?.name || '';
  const rating = product.data?.rating || 0;
  const price = product.data?.price || 0;
  const description = product.data?.description || '';
  const availability = product.data?.Availability || 'Out of Stock';
  const weight = product.data?.weight || '';

  return (
    <div className="p-4 w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* LEFT SIDE: Image Section */}
      <div className="w-full lg:w-1/2">
        <div className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[500px] bg-white rounded-2xl shadow-md p-4 mx-auto">
          <div className="relative w-full md:h-[400px] aspect-square overflow-hidden rounded-xl">
            <button
              className={`absolute left-2 top-1/2 -translate-y-1/2 ${icount === 0 ? "bg-gray-200" : "bg-yellow-500"} text-white hover:bg-white hover:text-yellow-500 rounded-full p-2 z-10`}
              onClick={handlePrev}
              disabled={icount === 0}
            >
              <FaAngleLeft />
            </button>
            
            <div className="p-10">
              <img
                src={currentImage}
                alt={`Product ${icount}`}
                className="bg-white backdrop-blur-3xl w-full h-full object-contain"
              />
            </div>

            <button
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${icount === product.data.image.length - 1 ? 'bg-gray-200' : 'bg-green-700'} text-white hover:bg-white hover:text-green-700 rounded-full p-2 z-10`}
              onClick={handleNext}
              disabled={icount === product.data.image.length - 1}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {product.data.image.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setIcount(index)}
              className={`w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-lg cursor-pointer border-2 ${icount === index ? 'border-green-500 border-4' : 'border-gray-300'}`}
              alt={`Thumbnail ${index}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: Product Info */}
      <div className="w-full lg:w-1/2">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500">{category}</h2>
          <div className="flex flex-row gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{name}</h1>
            <h1 className={`border ${availability === 'In Stock' ? "border-green-700 bg-green-100 text-green-700" : "border-red-700 bg-red-300 text-red-700"} text-sm font-semibold rounded-3xl px-6 py-1.5`}>
              {availability}
            </h1>
          </div>
          <p className="text-lg">⭐⭐⭐⭐⭐ <span>{rating}</span></p>
          <p className="text-xl font-semibold text-green-700">₹ {price}</p>
          <p className="text-gray-700">{description}</p>

          {/* Weight Options */}
          <div>
            <h3 className="font-semibold mb-2">Weight</h3>
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-1 border border-gray-300 rounded-md hover:bg-green-100">
                {weight}
              </button>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-wrap gap-4 items-center mt-4">
            <button
              className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800"
              onClick={() => addToCartHandler(product.data)}
            >
              Add To Cart
            </button>
            <button className="bg-yellow-400 px-6 py-2 rounded-full hover:bg-yellow-300">
              Buy Now
            </button>
            <button
             className={`flex items-center justify-center size-6 ${isInWishlist ? 'text-red-500' : "text-gray-400 hover:text-red-500"}`}
              onClick={() =>addToWhishList(product.data)}
            >
               <BsSuitHeartFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
