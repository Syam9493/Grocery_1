import React, { useState } from "react";

const AvailabilityData = [
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
  const [selected, setSelected] = useState([]);

  const handleChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <form className="flex flex-col items-start gap-4 overflow-auto">
        <h1 className="font-sans text-[20px] font-bold">Availability</h1>
        {AvailabilityData.map((item) => (
          <label
            key={item.id}
            htmlFor={`avail-${item.id}`}
            className="inline-flex items-center gap-2"
          >
            <input
              id={`avail-${item.id}`}
              type="checkbox"
              className="accent-green-700 size-4"
              checked={selected.includes(item.id)}
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

export default ProductAvailability;
