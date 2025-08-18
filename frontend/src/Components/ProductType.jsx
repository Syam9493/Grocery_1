import React, { useContext } from "react";
import { ProductFilterContext } from "../Contexts/AppContext";

const productTypes = [
  { id: 1, type: "Product Type", value: "Packaged Goods" },
  { id: 2, type: "Product Type", value: "Fresh Product" },
  { id: 3, type: "Product Type", value: "Frozen Foods" },
];

const ProductType = () => {
  const { dispatch, removeCheckItem, setCheckItems, checkItems } =
    useContext(ProductFilterContext);

  const handleChange = (type, value) => {
    const exists = checkItems.some(
      (item) => item.type === "Product Type" && item.value === value
    );
    if (exists) {
      dispatch(removeCheckItem({ type, value }));
    } else {
      dispatch(setCheckItems({ type, value }));
    }
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
              value={`${item.type}, ${item.value}`}
              checked={checkItems.some(
                (ci) => ci.type === item.type && ci.value === item.value
              )}
              onChange={() => handleChange(item.type, item.value)}
            />
            <p className="font-sans text-base font-semibold">{item.value}</p>
          </label>
        ))}
      </form>
      <div className="mt-7 border-b border-gray-400"></div>
    </>
  );
};

export default ProductType;
