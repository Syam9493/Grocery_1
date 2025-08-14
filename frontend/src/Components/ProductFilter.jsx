import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckItems, removeCheckItem } from "../Slice/ProdutSlice"; // Make sure path is correct
import Review from "../Components/Review";
import Brand from "../Components/Brand";
import ProductType from "../Components/ProductType";
import ProductAvailability from "../Components/ProductAvailability";

const ProductFilter = () => {
  const productNames = [
    "vegetables",
     "Fruits",
    "Beverages",
    "Milk & Eggs",
    "House Hold",
    "Dry Fruits",
    "BakeryItems",
    "Rice Items",
    "Olis",
  ];

  const dispatch = useDispatch();
  const checkedItemss = useSelector((state) => state.checkItems); // Redux state
  const { checkItems } = checkedItemss;

const ProductFileterHandler = (value) => {
  if (checkItems.includes(value)) {
    dispatch(removeCheckItem(value));
  } else {
    dispatch(setCheckItems(value));
  }
};

  const [PriceRange, setPriceRange] = useState(0);
 
   const ProductPriceRange = (e) => {
     setPriceRange(Number(e.target.value));
   };

  return (
    <aside className="w-64 p-4">
       <h3 className="font-sans text-[25px] font-bold mb-2 border-b-4 border-gray-400">Filter Options
       </h3>
      <h1 className="font-sans text-[20px] font-bold">Category</h1>
      <form className="h-60 m-4 flex flex-col items-start gap-4 overflow-y-auto">
        {productNames.map((item) => (
          <label
          key={item}
            className="inline-flex items-center gap-2"
          >
            <input
              type="checkbox"
              className="accent-green-700 size-4"
              value={item}
              checked={checkItems.includes(item)}
              onChange={() => ProductFileterHandler(item)}
            />
            <p className="font-sans text-base font-semibold">{item}</p>
          </label>
        ))}
      </form>
        <div className="mb-4 border-b border-gray-400"></div>
        <div className="mb-4 border-b border-gray-400">
        <div className="mb-3">
        <h4 className="font-medium mb-1">Price</h4>
        <input type="range" min={0} max={125} className="w-full accent-green-700" value={PriceRange} onChange={ProductPriceRange}/>
        <div className="font-semibold text-2xl mt-1 text-gray-500">₹{PriceRange}</div>
        </div>
      </div>
            <Review />
            <Brand />
            <ProductType />
            <ProductAvailability />
    </aside>
  );
};

export default ProductFilter;
