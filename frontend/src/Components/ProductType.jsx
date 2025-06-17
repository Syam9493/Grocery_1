import React from "react";

const ProductType = () => {
  const ProductType = [
    {
      id: 1,
      name: "Packaged Goods",
    },
    {
      id: 2,
      name: "Fresh Product",
    },
    {
      id: 3,
      name: "Frozen Foods",
    },
  ];

  return (
    <form className="flex flex-col justify-center items-start gap-4 overflow-auto">
      <h1 className="font-sans text-[20px] font-bold">Product Type</h1>
      {ProductType.map((items) => (
        <label key={items.id} className="inline-flex items-center gap-2">
          <input type="checkbox" className="accent-green-700 size-4" />
          <p className="font-sans text-base font-semibold">{items.name}</p>
        </label>
      ))}
    </form>
  );
};

export default ProductType;
