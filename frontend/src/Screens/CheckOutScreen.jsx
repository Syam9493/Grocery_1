import React, { useState } from "react";

import CheckOutForm from "../Components/CheckOutForm";
import OrderSummary from "../Components/OrderSummary";

const CheckOutScreen = () => {
  const [orderForm, setOrderForm] = useState({
    Firstname: "",
    Lastname: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    cellNumber: "",
    email: "",
    deliveryAddress: false,
  });

  return (
    <div className="flex flex-col justify-center gap-3 md:flex-row bg-gray-100 p-3 m-3">
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        <CheckOutForm orderForm={orderForm} setOrderForm={setOrderForm} />
        <OrderSummary orderForm={orderForm} />
      </div>
    </div>
  );
};

export default CheckOutScreen;
