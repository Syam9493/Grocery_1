import React, { useContext } from "react";
import { ProductFilterContext } from "../Contexts/AppContext";

const AvailabilityData = [
  {
    id: 1,
    type: "Availability",
    value: "In Stock",
  },
  {
    id: 2,
    type: "Availability",
    value: "Out of Stock",
  },
];

const ProductAvailability = () => {
  const { dispatch, removeCheckItem, setCheckItems, checkItems } =
    useContext(ProductFilterContext);
  //const [selected, setSelected] = useState([]);

  const handleChange = (type, value) => {
    // setSelected((prev) =>
    //   prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    // );

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

export default ProductAvailability;
