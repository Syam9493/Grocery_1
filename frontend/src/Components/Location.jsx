import React, { useEffect, useState } from "react";
import UserLocation from "./UserLocation/UserLocation"; // <-- Fix filename

const Location = () => {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY; // Use env variable

  // Automatically detect GPS location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
          );
          const data = await res.json();

          if (data.results.length > 0) {
            const result = data.results[0];
            const countryCode = result.components.country_code?.toUpperCase();
            const locationName =
              result.components.county ??
              result.components.city ??
              result.components.town ??
              result.components.village ??
              "";

            if (countryCode === "IN") {
              setLocationData({
                source: "gps",
                formatted: result.formatted,
                city: locationName,
                state: result.components.state,
                country: result.components.country,
              });
            } else {
              setError("GPS location is not in India.");
            }
          }
        } catch (err) {
          setError(`Error getting location from GPS: ${err.message}`);
        }
      },
      (err) => {
        setError(`Permission denied or unavailable: ${err.message}`);
      }
    );
  }, [apiKey]);

  return (
    <div className="flex items-center gap-1.5 mr-3 max-w-full flex-wrap sm:flex-nowrap">
      <p className="text-lg">📍</p>
      <div className="flex-1 min-w-0">
        {locationData ? (
          <p className="font-medium text-white truncate w-32 sm:w-40">
            {locationData.city}, {locationData.state}
          </p>
        ) : (
          <p className="text-sm text-white truncate w-32 sm:w-40">
            {error || "Detecting location..."}
          </p>
        )}
      </div>
      <UserLocation onLocationChange={setLocationData} />
    </div>
  );
};

export default Location;

