// import React, {useState, useEffect} from "react";
// import { FaAngleDown } from "react-icons/fa6";
// import { Popover, PopoverButton, PopoverPanel, PopoverBackdrop } from '@headlessui/react';

// const UserLocation = ({onLocationChange}) => {
//   const [input, setInput] = useState('');
//   const [locationData, setLocationData] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY; // Use env variable

//    useEffect(() => {
//   if (!input.trim()) {
//     onLocationChange(null);
//     setError("");
//     return; 
//   }

//   const fetchManualLocation = async (query) => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch(
//         `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//           query
//         )}&key=${apiKey}&countrycode=IN`
//       );
//       const data = await res.json();

//       if (data.results.length > 0) {
//         const result = data.results[0];
//         console.log(result);

//        const locationName =
//        result.components.recreation_ground??
//        result.components.road??
//        result.components.village??
//        result.components.suburb??
//        result.components.town??
//        result.components.city??
//        result.components.county??
//   "";

//     console.log(locationName);
//         setLocationData({
//           source: "manual",
//           formatted: result.formatted,
//           city:locationName,
//           state: result.components.state,
//           country: result.components.country,
//         })
//       } else {
//         setError("No results found");
//         onLocationChange(null);
//       }
//     } catch (err) {
//       setError(err);
//       onLocationChange(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const delayDebounce = setTimeout(() => {
//     fetchManualLocation(input);
//   }, 500);

//   return () => clearTimeout(delayDebounce);
// }, [input, onLocationChange, apiKey]);


//   const updateLocation = async () => {
//     try {
//       onLocationChange({
//           source: "manual",
//           city:locationData.city,
//           state: locationData.state,
//           country: locationData.country,
//         });
//       setOpen(false);
//     } catch (error) {
//       console.error("Error updating location:", error);
//     }
//   }



//   return (
//     <div>
//       <Popover open={open} onChange={setOpen}>
//         <PopoverButton className="text-sm/6 font-semibold text-yellow-600 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white" onClick={() => setOpen(!open)}>
//           <FaAngleDown size={20} className="text-yellow-300" />
//         </PopoverButton>

//         <PopoverBackdrop className="fixed inset-0 bg-black/15" />

//         <PopoverPanel
//           anchor="bottom"
//           className={"w-xl h-52 divide-y divide-white/5 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0 z-100 p-3"}
//         >
//           <div className="block rounded-lg px-3 py-2 transition hover:bg-white/5">
//             <p className="font-semibold text-black">Enter your location</p>
//             <input
//               type="text"
//               placeholder="Enter your location"
//               className="mt-2 w-full border border-gray-300 rounded-md px-2 py-1 text-black"
//               value={input}
//              onChange={(e) => setInput(e.target.value)}
//             />
//           </div>
//           {loading && <p className="mt-2 text-sm text-gray-500">Searching...</p>}
//         {error && <p className="text-red-500 mt-2">{error}</p>}

//       {locationData && (
//         <div className="mt-4 bg-gray-100 p-3 rounded">
//           <button onClick={updateLocation} className="font-semibold text-black">
//             <strong>Location:</strong> {locationData.formatted}
//           </button>
//         </div>
//       )}
//         </PopoverPanel>
//       </Popover>
//     </div>
//   );
// };

// export default UserLocation;


import React, { useEffect, useState, Fragment } from "react";
import { FaAngleDown } from "react-icons/fa6";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  PopoverBackdrop
} from "@headlessui/react";

const UserLocation = ({ onLocationChange }) => {
  const [input, setInput] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  useEffect(() => {
    if (!input.trim()) {
      setLocationData(null);
      setError("");
      return;
    }

    const controller = new AbortController();

    const fetchManualLocation = async (query) => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            query
          )}&key=${apiKey}&countrycode=IN`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data.results) && data.results.length > 0) {
          const result = data.results[0];
          const c = result.components || {};

          const locationName =
            c.recreation_ground ??
            c.road ??
            c.village ??
            c.suburb ??
            c.town ??
            c.city ??
            c.county ??
            "";

          setLocationData({
            source: "manual",
            formatted: result.formatted,
            city: locationName || c.city || "",
            state: c.state || "",
            country: c.country || "",
          });
        } else {
          setLocationData(null);
          setError("No results found");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setLocationData(null);
          setError(err.message || "Failed to fetch location");
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (apiKey) fetchManualLocation(input);
      else setError("Missing OpenCage API key");
    }, 500); // debounce

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [input, apiKey]);

  return (
    <div className="relative inline-block">
      <Popover className="relative">
        {({ close }) => (
          <>
            <PopoverButton
              className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-yellow-700 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Choose location"
            >
              <FaAngleDown size={16} className="text-yellow-400" />
            </PopoverButton>
              <PopoverBackdrop className="fixed inset-0 bg-black/30" />
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {/* v2: use PopoverPanel + anchor for positioning */}
              <PopoverPanel
                anchor="bottom end"
                className="z-100 mt-20 ml-10 w-md rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5"
              >
                <div className="space-y-3">
                  <p className="font-semibold text-gray-800">
                    Enter your location
                  </p>

                  <input
                    type="text"
                    placeholder="Type your area / city"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? "loc-error" : undefined}
                  />

                  {loading && (
                    <p className="text-sm text-gray-500">Searching…</p>
                  )}
                  {error && (
                    <p id="loc-error" className="text-sm text-red-600">
                      {error}
                    </p>
                  )}

                  {locationData && (
                    <button
                      type="button"
                      onClick={() => {
                        onLocationChange?.({
                          source: "manual",
                          city: locationData.city,
                          state: locationData.state,
                          country: locationData.country,
                        });
                        close(); // close popover after choosing
                      }}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-left transition hover:bg-yellow-50"
                    >
                      <strong className="text-gray-800">Use location:</strong>
                      <p className="truncate text-sm text-gray-600">
                        {locationData.formatted}
                      </p>
                    </button>
                  )}
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default UserLocation;
