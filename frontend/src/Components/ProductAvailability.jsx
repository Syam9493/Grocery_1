import React from "react";

const AvailablilityData = [
  {
    id: 1,
    name: "In Stock",
  },
  {
    id: 2,
    name: "Out of Stock",
  },
];


const ProductAvailability = () => {
  return (
    <form className="flex flex-col items-start gap-4 overflow-auto">
      <h1 className="font-sans text-[20px] font-bold">Availability</h1>
      {AvailablilityData.map((items) => (
        <label key={items.id} className="inline-flex items-center gap-2">
          <input type="checkbox" className="accent-green-700 size-4" />
          <p className="font-sans text-base font-semibold">{items.name}</p>
        </label>
      ))}
    </form>
  );
};

export default ProductAvailability;
