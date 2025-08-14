import React, { useState } from "react";

const productTypes = [
  { id: 1, name: "Packaged Goods" },
  { id: 2, name: "Fresh Product" },
  { id: 3, name: "Frozen Foods" },
];

const ProductType = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleChange = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <form className="flex flex-col justify-center items-start gap-4 overflow-auto">
        <h1 className="font-sans text-[20px] font-bold">Product Type</h1>
        {productTypes.map((item) => (
          <label
            key={item.id}
            htmlFor={`type-${item.id}`}
            className="inline-flex items-center gap-2"
          >
            <input
              id={`type-${item.id}`}
              type="checkbox"
              className="accent-green-700 size-4"
              checked={selectedTypes.includes(item.id)}
              onChange={() => handleChange(item.id)}
            />
            <p className="font-sans text-base font-semibold">{item.name}</p>
          </label>
        ))}
      </form>
      <div className="mt-7 border-b border-gray-400"></div>
    </>
  );
};

export default ProductType;
