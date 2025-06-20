import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCheckItems } from "../Slice/ProdutApi"; // Make sure path is correct

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
  //const checkItems = useSelector((state) => state.checkItems); // Redux state

  const [checkedItems, setCheckedItems] = useState([]); // Local state for controlled checkboxes

  const ProductFileterHandler = (value, checked) => {
    let updatedItems;
    if (checked) {
      updatedItems = [...checkedItems, value];
    } else {
      updatedItems = checkedItems.filter((item) => item !== value);
    }
    dispatch(setCheckItems(updatedItems)); // Dispatch to Redux
    setCheckedItems(updatedItems || []); // Update local state
  };

  return (
    <div>
      <h1 className="font-sans text-[20px] font-bold">Category</h1>
      <form className="h-60 m-4 flex flex-col items-start gap-4 overflow-auto">
        {productNames.map((item, i) => (
          <label key={i} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-green-700 size-4"
              value={item}
              checked={checkedItems.includes(item)}
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
