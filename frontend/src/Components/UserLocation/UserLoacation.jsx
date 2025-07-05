import React, {useState, useEffect} from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Popover, PopoverButton, PopoverPanel, PopoverBackdrop } from '@headlessui/react';

const UserLoacation = ({onLocationChange}) => {
  const [input, setInput] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  



  const apiKey = '122f927c1da14d06a9ee6050187e212d'; // Replace with your real OpenCage key

   useEffect(() => {
  if (!input.trim()) {
    onLocationChange(null);
    setError("");
    return;
  }

  const fetchManualLocation = async (query) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          query
        )}&key=${apiKey}&countrycode=IN`
      );
      const data = await res.json();

      if (data.results.length > 0) {
        const result = data.results[0];
        console.log(result);

       const locationName =
       result.components.recreation_ground??
       result.components.road??
       result.components.village??
       result.components.suburb??
       result.components.town??
       result.components.city??
       result.components.county??
  "";

    console.log(locationName);
        setLocationData({
          source: "manual",
          formatted: result.formatted,
          city:locationName,
          state: result.components.state,
          country: result.components.country,
        })
      } else {
        setError("No results found");
        onLocationChange(null);
      }
    } catch (err) {
      setError(err);
      onLocationChange(null);
    } finally {
      setLoading(false);
    }
  };

  const delayDebounce = setTimeout(() => {
    fetchManualLocation(input);
  }, 500);

  return () => clearTimeout(delayDebounce);
}, [input, onLocationChange, apiKey]);


  const updateLocation = () => {
    
     onLocationChange({
          source: "manual",
          city:locationData.city,
          state: locationData.state,
          country: locationData.country,
        });
  }



  return (
    <div>
      <Popover>
        <PopoverButton className="text-sm/6 font-semibold text-yellow-600 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white">
          <FaAngleDown size={20} className="text-yellow-300" />
        </PopoverButton>

        <PopoverBackdrop className="fixed inset-0 bg-black/15" />

        <PopoverPanel
          anchor="bottom"
          className={"w-xl h-52 divide-y divide-white/5 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0 z-100 p-3"}
        >
          <div className="block rounded-lg px-3 py-2 transition hover:bg-white/5">
            <p className="font-semibold text-black">Enter your location</p>
            <input
              type="text"
              placeholder="Enter your location"
              className="mt-2 w-full border border-gray-300 rounded-md px-2 py-1 text-black"
              value={input}
             onChange={(e) => setInput(e.target.value)}
            />
          </div>
          {loading && <p className="mt-2 text-sm text-gray-500">Searching...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}

      {locationData && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <a onClick={updateLocation}><strong>Location:</strong> {locationData.formatted}</a>
        </div>
      )}
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default UserLoacation;
