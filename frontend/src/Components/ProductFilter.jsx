import {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";


import { setCheckItems, removeCheckItem } from "../Slice/ProdutSlice"; // Make sure path is correct
import Review from "../Components/Review";
import Brand from "../Components/Brand";
import ProductType from "../Components/ProductType";
import ProductAvailability from "../Components/ProductAvailability";
import { ProductFilterContext } from "../Contexts/AppContext";
import Categories from "./Slider/Categories";




const ProductFilter = () => { 
  const productNames = [
    { type: "category", value: "vegetables" },
    { type: "category", value: "Fruits" },
    { type: "category", value: "Beverages" },
    { type: "category", value: "milk & eggs" },
    { type: "category", value: "cleaning items" },
    { type: "category", value: "Dry Fruits" },
    { type: "category", value: "Bakery Items" },
    { type: "category", value: "Rice Items" },
    { type: "category", value: "Oils" },
  ];
  
  

  const dispatch = useDispatch();

  const checkedItemss = useSelector((state) => state.checkItems); // Redux state
  const { checkItems } = checkedItemss;


    // Add this useEffect hook
  useEffect(() => {
    // Check if there are any price filters in checkItems
    const hasPriceFilter = checkItems.some(item => item.type === "price");
    
    // If no price filter exists but our local state isn't zero, reset it
    if (!hasPriceFilter && checkItems.price !== 0) {
      setPriceRange(0);
      priceRangeRef.current = 0;
    }
  }, [checkItems ]); // Run this effect whenever checkItems changes

const ProductFileterHandler = (type, value) => {
const exists = checkItems.some(item => item.type === type && item.value === value);

  if (exists) {
    dispatch(removeCheckItem({ type, value }));
  } else {
    dispatch(setCheckItems({ type, value }));
  }
};

 const [priceRange, setPriceRange] = useState(0);
 const priceRangeRef = useRef();



const ProductPriceRange = (e) => {
  const newPrice = Number(e.target.value);
  
  // Always update the UI immediately
  setPriceRange(newPrice);
  priceRangeRef.current = newPrice;

  // Find any existing price filter
  const existingPriceFilter = checkItems.find(item => item.type === "price");

  if (newPrice === 0) {
    // If sliding to zero, remove any price filter that exists
    if (existingPriceFilter) {
      dispatch(removeCheckItem(existingPriceFilter));
    }
  } else {
    // For non-zero prices
    if (existingPriceFilter) {
      // If there's an existing price, update it by removing old and adding new
      dispatch(removeCheckItem(existingPriceFilter));
      dispatch(setCheckItems({ type: "price", value: newPrice }));
    } else {
      // If no existing price, just add the new one
      dispatch(setCheckItems({ type: "price", value: newPrice }));
    }
  }
};



  return (
    <ProductFilterContext.Provider value={{ dispatch, removeCheckItem, setCheckItems, checkItems }}>                
    <aside className="w-64 p-4">
       <h3 className="font-sans text-[25px] font-bold mb-2 border-b-4 border-gray-400">Filter Options
       </h3>
      <h1 className="font-sans text-[20px] font-bold">Category</h1>
      <form className="h-60 m-4 flex flex-col items-start gap-4 overflow-y-auto">
        {productNames.map((item) => (
          <label
          key={item.type}
            className="inline-flex items-center gap-2"
          >
            <input
              type="checkbox"
              className="accent-green-700 size-4"
              value={`${item.type}, ${item.value}`}
              checked={checkItems.some(
                (ci) => ci.type === item.type && ci.value === item.value
              )}
              onChange={() => ProductFileterHandler(item.type, item.value)}
            />
            <p className="font-sans text-base font-semibold">{item.value}</p>
          </label>
        ))}
      </form>
        <div className="mb-4 border-b border-gray-400"></div>
        <div className="mb-4 border-b border-gray-400">
        <div className="mb-3">
        <h4 className="font-medium mb-1">Price</h4>
        <input type="range" min={0} max={125} step={5} className="w-full accent-green-700" value={priceRange}  onChange={ProductPriceRange}/>
        <div className="font-semibold text-2xl mt-1 text-gray-500">₹{priceRange}</div>
        </div>
      </div>
      
            <Review />
            <Brand />
            <ProductType />
            <ProductAvailability />
    </aside>
    </ProductFilterContext.Provider>
  );
};

export default ProductFilter;
