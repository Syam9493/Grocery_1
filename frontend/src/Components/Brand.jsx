import React, { useState } from "react";

const Brand = () => {
  const BrandNames = [
    {
      id: 1,
      name: "Fresh Harvest",
    },
    {
      id: 2,
      name: "Nature's Best",
    },
    {
      id: 3,
      name: "Good Grains",
    },
    {
      id: 4,
      name: "Farm Fresh",
    },
    {
      id: 5,
      name: "Green Grocer",
    },
  ];

  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id)
        ? prev.filter((brandId) => brandId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <form className="flex flex-col items-start gap-4 overflow-auto">
        <h1 className="font-sans text-[20px] font-bold">Brand</h1>

        {BrandNames.map((items) => (
          <label
            key={items.id}
            htmlFor={`brand-${items.id}`}
            className="inline-flex items-center gap-2"
          >
            <input
              id={`brand-${items.id}`}
              type="checkbox"
              className="accent-green-700 size-4"
              checked={selectedBrands.includes(items.id)}
              onChange={() => handleCheckboxChange(items.id)}
            />
            <p className="font-sans text-base font-semibold">{items.name}</p>
          </label>
        ))}
      </form>
      <div className="mt-7 border-b border-gray-400"></div>
    </>
  );
};

export default Brand;
