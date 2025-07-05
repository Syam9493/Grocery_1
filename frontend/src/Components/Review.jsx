import React from "react";

const ratingData = [
  {
    id: 1,
    stars: "⭐⭐⭐⭐⭐",
    name: "5 Star",
  },
  {
    id: 2,
    stars: "⭐⭐⭐⭐⭐",
    name: "4 Star",
  },
  {
    id: 3,
    stars: "⭐⭐⭐⭐⭐",
    name: "3 Star",
  },
  {
    id: 4,
    stars: "⭐⭐⭐⭐⭐",
    name: "2 Star",
  },
  {
    id: 5,
    stars: "⭐⭐⭐⭐⭐",
    name: "1 Star",
  },
];


const Review = () => {
  return (
    <div className="flex flex-col items-start">
      <h1 className="font-sans text-[20px] font-bold">Review</h1>
      {ratingData.map((items) => (
        <label key={items.id} className="inline-flex items-center gap-2">
          <input type="checkbox" className="accent-green-700 size-4" />
          <p>{items.stars}</p>
          <h2 className="font-sans text-base font-semibold">{items.name}</h2>
        </label>
      ))}
    </div>
  );
};

export default Review;
