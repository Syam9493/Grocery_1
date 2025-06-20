import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckItems, removeCheckItem } from "../Slice/ProdutApi"; // Make sure path is correct

const ProductFilter = () => {
  const productNames = [
    "vegetables",
    "Fruits",
    "Beverages",
    "Milk & Eggs",
    "House Hold",
    "Dry Fruits",
    "Bekary Items",
    "Rice Items",
    "Olis",
  ];

  const dispatch = useDispatch();
  const checkedItemss = useSelector((state) => state.checkItems); // Redux state
  const { checkItems } = checkedItemss;

  const ProductFileterHandler = (value, checked) => {
    if (checked) {
      const updatedItems = value;
      dispatch(setCheckItems(updatedItems)); // Dispatch to Redux
    } else {
      //const updatedItems = checkItems.filter((_, index) => index !== value);
      dispatch(removeCheckItem(checked));
    }
  };

  return (
    <div>
      <h1 className="font-sans text-[20px] font-bold">Category</h1>
      <form className="h-60 m-4 flex flex-col items-start gap-4 overflow-auto">
        {productNames.map((item, i) => (
          <label
            key={i}
            className="inline-flex items-center gap-2"
            hidden={checkItems.includes(item)}
          >
            <input
              type="checkbox"
              className="accent-green-700 size-4"
              value={item}
              checked={checkItems.includes(item)}
              onChange={(e) => ProductFileterHandler(item, e.target.checked)}
            />
            <p className="font-sans text-base font-semibold">{item}</p>
          </label>
        ))}
      </form>
    </div>
  );
};

export default ProductFilter;
