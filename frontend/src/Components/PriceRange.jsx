import React, { useState } from "react";

const PriceRange = ({ min = 0, max = 500, step = 5, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
    onChange([value, maxValue]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
    onChange([minValue, value]);
  };

  return (
    <div className="w-full p-4">
      <h3 className="font-semibold mb-2">Price</h3>
      <p className="text-gray-700 mb-3">
        ${minValue} - ${maxValue}
      </p>

      <div className="relative w-full">
        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full pointer-events-none accent-green-600"
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="w-full accent-green-600"
        />
      </div>
    </div>
  );
};

export default PriceRange;
