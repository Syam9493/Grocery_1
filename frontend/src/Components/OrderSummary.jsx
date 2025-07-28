import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";

import { useGetUserCartQuery } from "../ApiSlice/cartApi.js";
import {useCreateOrderMutation} from '../ApiSlice/checkOutApi.js'



const OrderSummary = ({orderForm}) => {
    const buttonLabels = ["Proceed to Checkout", "Proceed to Payment", "Confirm Payment"];
    const [buttonIndex, setButtonIndex] = useState(0);
     
  const [CreateOrder] = useCreateOrderMutation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userID = userInfo?._id;

  const { data } = useGetUserCartQuery(userID, {
      skip: !userID, // prevent query if no userID
    }); // Destructure properly
    
//      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   const userID = userInfo?._id;

 console.log(data?.data)

  

  const cartItems = data?.data?.cartItems
  console.log(cartItems);

  const payload = {
  user: userID,
  shippingAddress: orderForm,
  orderItems: cartItems, // ✅ match what backend expects,
  couponDiscount: data?.data.couponDiscount,
  subtotal: data?.data.subtotal,
  shippingcost: data?.data.subtotal,
  taxes: data?.data.taxes,
  total: data?.data.total,
  totalItems: data?.data.totalItems
};

 const navigate = useNavigate();
  const location = useLocation();

  // 🔄 Sync button index with current route
  useEffect(() => {
    if (location.pathname === '/checkout') {
      setButtonIndex(1);
    } else if (location.pathname === '/payment') {
      setButtonIndex(2);
    } else if (location.pathname === '/order-completed') {
      setButtonIndex(0); // Reset or hide button if needed
    } else {
      setButtonIndex(0);
    }
  }, [location.pathname]);

  // 🧭 Navigation logic based on button step
  const handleCheckOut = async () => {
    if (!cartItems || cartItems?.length === 0) {
  toast.error('Add items to cart before proceeding!');
  return;
}

    if (buttonIndex === 0) {
      navigate("/checkout");
    } else if (buttonIndex === 1) {
        console.log(orderForm, data?.data);
        await CreateOrder(payload).unwrap();
        navigate("/payment");
    } else if (buttonIndex === 2) {
     await navigate("/order-completed");
    }
  };

  return (
    <>
    {/* Order Summary Section */}
      <div className="w-full lg:w-2/7">
        {data?.data && (
          <div className="w-full bg-white rounded-lg shadow-md p-5 space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items</span>
                <span className="font-medium">
                  {data?.data?.totalItems || 0}
                </span>
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
                  ₹{data?.data?.shippingcost?.toFixed(2) || "0.00"}
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full transition duration-200"
            onClick={handleCheckOut}
            >
             {buttonLabels[buttonIndex]}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default OrderSummary



 