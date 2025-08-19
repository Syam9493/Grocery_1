import { useContext } from "react";
import { ProductFilterContext } from "../Contexts/AppContext";

const ratingData = [
  {
    id: 1,
    type: "rating",
    stars: "⭐⭐⭐⭐⭐",
    value: "5",
  },
  {
    id: 2,
    type: "rating",
    stars: "⭐⭐⭐⭐⭐",
    value: "4",
  },
  {
    id: 3,
    type: "rating",
    stars: "⭐⭐⭐⭐⭐",
    value: "3",
  },
  {
    id: 4,
    type: "rating",
    stars: "⭐⭐⭐⭐⭐",
    value: "2",
  },
  {
    id: 5,
    type: "rating",
    stars: "⭐⭐⭐⭐⭐",
    value: "1",
  },
];

const Review = () => {
  const { dispatch, removeCheckItem, setCheckItems, checkItems } =
    useContext(ProductFilterContext);

  const handleRatingChange = (type, value) => {
    const exists = checkItems.some(
      (item) => item.type === "rating" && item.value === value
    );
    if (exists) {
      dispatch(removeCheckItem({ type, value }));
    } else {
      dispatch(setCheckItems({ type, value }));
    }
  };

  return (
    <>
      <div className="flex flex-col items-start">
        <h1 className="font-sans text-[20px] font-bold">Review</h1>
        {ratingData.map((items) => (
          <label key={items.id} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-green-700 size-4"
              value={`${items.type}, ${items.value}`}
              checked={checkItems.some(
                (ci) => ci.type === items.type && ci.value === items.value
              )}
              onChange={() => handleRatingChange(items.type, items.value)}
            />
            <p>{items.stars}</p>
            <p>{items.value} Star</p>
          </label>
        ))}
      </div>
      <div className="mt-7 border-b border-gray-400"></div>
    </>
  );
};

export default Review;
