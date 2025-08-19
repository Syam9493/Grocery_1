import React, { useContext } from "react";
import { ProductFilterContext } from "../Contexts/AppContext";

const Brand = () => {
  const BrandNames = [
    {
      id: 1,
      type: "brand",
      value: "Fresh Harvest",
    },
    {
      id: 2,
      type: "brand",
      value: "Nature's Best",
    },
    {
      id: 3,
      type: "brand",
      value: "Good Grains",
    },
    {
      id: 4,
      type: "brand",
      value: "Farm Fresh",
    },
    {
      id: 5,
      type: "brand",
      value: "Green Grocer",
    },
  ];

  const { dispatch, removeCheckItem, setCheckItems, checkItems } =
    useContext(ProductFilterContext);

  const handleCheckboxChange = (type, value) => {
    const exists = checkItems.some(
      (item) => item.type === type && item.value === value
    );
    if (exists) {
      dispatch(removeCheckItem({ type, value }));
    } else {
      dispatch(setCheckItems({ type, value }));
    }
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
              checked={checkItems.some(
                (ci) => ci.type === items.type && ci.value === items.value
              )}
              onChange={() => handleCheckboxChange(items.type, items.value)}
            />
            <p className="font-sans text-base font-semibold">{items.value}</p>
          </label>
        ))}
      </form>
      <div className="mt-7 border-b border-gray-400"></div>
    </>
  );
};

export default Brand;
