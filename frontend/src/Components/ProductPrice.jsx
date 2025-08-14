import React, { useState } from "react";

const ProductPrice = () => {
  const [PriceRange, setPriceRange] = useState(0);

  const ProductPriceRange = (e) => {
    setPriceRange(Number(e.target.value));
  };
  

  return (
    <div>
      <h1 className="font-sans text-[20px] font-bold border-b-4 border-gray-400">Price</h1>
      <label htmlFor="price-range" className="block mb-2">Select Price Range</label>
      <p>₹{PriceRange}</p>
      <input
        id="price-range"
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
