// import {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// //import { useSelector } from 'react-redux';
// import { toast } from "react-toastify";

// import { useGetUserCartQuery } from "../ApiSlice/cartApi.js";
// import {useCreateOrderMutation} from '../ApiSlice/checkOutApi.js';
// import useAuthUser from '../Hooks/useAuthUser.js';



// const buttonLabels = [
//     { label: "Proceed to Checkout", path: "/checkout" },
//   { label: "Proceed to Payment", path: "/payment" },
//   { label: "Confirm Payment", path: "/order-completed" },
//   ];

// const OrderSummary = ({orderForm}) => {
    
//   const [buttonIndex, setButtonIndex] = useState(0);
//   const [orderRes, setOrderRes] = useState(null);
//    const { userID } = useAuthUser();
//   // console.log("User data:", user);
//   // console.log("User ID:", userID);

//    // ✅ Query cart only if userID exists
//   const { data, isLoading } = useGetUserCartQuery(userID, {
//     skip: !userID,
//   });

//   console.log("Cart Data:", data);

//   const [createOrder] = useCreateOrderMutation();
//   console.log("Order Response:", orderRes);

//   const cartItems = data?.data?.cartItems || [];

//   console.log("Cart Items:", cartItems);

//   const payload = {
//     user: userID,
//     shippingAddress: orderForm,
//     orderItems: cartItems,
//     couponDiscount: data?.data?.couponDiscount,
//     subtotal: data?.data?.subtotal,
//     shippingCost: data?.data?.shippingcost, // ✅ handle both cases
//     taxes: data?.data?.taxes,
//     total: data?.data?.total,
//     totalItems: data?.data?.totalItems,
//   };

//   const navigate = useNavigate();
  

//   // 🧭 Navigation logic based on button step
//   const handleCheckOut = async () => {
//      if (!cartItems?.length) {
//       toast.error("Add items to cart before proceeding!");
//       return;
//     }

//     if (buttonIndex === 0) {
//       navigate("/checkout");
//       setButtonIndex(1);
//     } else if (buttonIndex === 1) {
//       try {
//         const res = await createOrder(payload).unwrap();
//         console.log("Order Created:", res);
//         setOrderRes(res);
//         toast.success("Order created successfully!");
//         navigate("/payment");
//         setButtonIndex(2);
//       } catch (err) {
//         console.error("Order creation failed:", err);
//         toast.error("Failed to create order!");
//       }
//     } else if (buttonIndex === 2) {
//       navigate("/order-completed");
//       setButtonIndex(0);
//     }
//   };

//   return (
//     <>
//     {/* Order Summary Section */}
//     {isLoading ? <div>Loading...</div> : (
//       <div className="w-full lg:w-2/7">
//         {data?.data && (
//           <div className="w-full bg-white rounded-lg shadow-md p-5 space-y-4">
//             <h2 className="text-lg font-semibold border-b pb-2">
//               Order Summary
//             </h2>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span>Items</span>
//                 <span className="font-medium">
//                   {data?.data?.totalItems || 0}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Sub Total</span>
//                 <span className="font-medium">
//                   ₹{data?.data?.subtotal?.toFixed(2) || "0.00"}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span className="font-medium">
//                   ₹{data?.data?.shippingcost?.toFixed(2) || "0.00"}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Taxes</span>
//                 <span className="font-medium">
//                   ₹{data?.data?.taxes?.toFixed(2) || "0.00"}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Coupon Discount</span>
//                 <span className="text-red-600 font-medium">
//                   - ₹{data?.data?.couponDiscount?.toFixed(2) || "0.00"}
//                 </span>
//               </div>
//             </div>

//             <div className="border-t pt-2 flex justify-between text-base font-semibold">
//               <span>Total</span>
//               <span>₹{data?.data?.total?.toFixed(2) || "0.00"}</span>
//             </div>
//             <button 
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full transition duration-200"
//             onClick={handleCheckOut}
//             >
//              {buttonLabels[buttonIndex]}
//             </button>
//           </div>
//         )}
//       </div>
//     )}
//     </>
//   )
// }

// export default OrderSummary

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { useGetUserCartQuery } from "../ApiSlice/cartApi.js";
import { useCreateOrderMutation } from '../ApiSlice/checkOutApi.js';
import useAuthUser from '../Hooks/useAuthUser.js';

const buttonLabels = [
  { label: "Proceed to Checkout", path: "/checkout" },
  { label: "Proceed to Payment", path: "/payment" },
  { label: "Confirm Payment", path: "/order-completed" },
];

const OrderSummary = ({ orderForm }) => {
  const [buttonIndex, setButtonIndex] = useState(0);
  const { userID } = useAuthUser();
  const { data, isLoading } = useGetUserCartQuery(userID, { skip: !userID });
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = data?.data?.cartItems || [];

  // ✅ Sync button label with current route
  useEffect(() => {
    if (location.pathname.includes("/checkout")) {
      setButtonIndex(1);
    } else if (location.pathname.includes("/payment")) {
      setButtonIndex(2);
    } else {
      setButtonIndex(0);
    }
  }, [location.pathname]);

  // ✅ Validate Address
  const isAddressValid = (form) => {
    return (
      form &&
      form.Firstname?.trim() &&
      form.Lastname?.trim() &&
      form.country?.trim() &&
      form.streetAddress?.trim() &&
      form.city?.trim() &&
      form.zipcode?.trim()
    );
  };

  const payload = {
    user: userID,
    shippingAddress: orderForm,
    orderItems: cartItems,
    couponDiscount: data?.data?.couponDiscount,
    subtotal: data?.data?.subtotal,
    shippingCost: data?.data?.shippingCost || data?.data?.shippingcost,
    taxes: data?.data?.taxes,
    total: data?.data?.total,
    totalItems: data?.data?.totalItems,
  };

  const handleCheckOut = async () => {
    if (!cartItems?.length) {
      toast.error("Add items to cart before proceeding!");
      return;
    }

    if (buttonIndex === 0) {
      navigate("/checkout");
    } else if (buttonIndex === 1) {
      if (!isAddressValid(orderForm)) {
        toast.error("Please fill your shipping address before proceeding!");
        return;
      }
      try {
        await createOrder(payload).unwrap();
        toast.success("Order created successfully!");
        navigate("/payment");
      } catch (err) {
        console.error("Order creation failed:", err);
        toast.error("Failed to create order!");
      }
    } else if (buttonIndex === 2) {
      navigate("/order-completed");
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full lg:w-2/7">
          {data?.data && (
            <div className="w-full bg-white rounded-lg shadow-md p-5 space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span className="font-medium">{data?.data?.totalItems || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span className="font-medium">
                    ₹{data?.data?.subtotal?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">
                    ₹{(data?.data?.shippingCost || data?.data?.shippingcost)?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-medium">
                    ₹{data?.data?.taxes?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon Discount</span>
                  <span className="text-red-600 font-medium">
                    - ₹{data?.data?.couponDiscount?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>

              <div className="border-t pt-2 flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>₹{data?.data?.total?.toFixed(2) || "0.00"}</span>
              </div>

              <button
                className={`w-full ${
                  buttonIndex === 1 && !isAddressValid(orderForm)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white font-semibold py-2 rounded-full transition duration-200`}
                onClick={handleCheckOut}
                disabled={buttonIndex === 1 && !isAddressValid(orderForm)}
              >
                {buttonLabels[buttonIndex]?.label || "Proceed"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderSummary;
