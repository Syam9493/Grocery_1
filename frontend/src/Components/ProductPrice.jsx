import React, { useState } from "react";

const ProductPrice = () => {
  const [PriceRange, setPriceRange] = useState(0);

  const ProductPriceRange = (e) => {
    setPriceRange(Number(e.target.value));
  };
  

  return (
    <div>
      <h1 className="font-sans text-[20px] font-bold">Price</h1>
      <p>₹{PriceRange}</p>
      <input
        type="range"
        min="0"
        max="500"
        step="1"
        value={PriceRange}
        className="accent-green-700"
        onChange={ProductPriceRange}
      />
    </div>
  );
};

export default ProductPrice;
