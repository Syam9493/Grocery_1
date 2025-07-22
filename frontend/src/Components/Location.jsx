
import React, { useEffect, useState } from "react";
import UserLoacation from "./UserLocation/UserLoacation";


const Location = () => {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState("");
  
  
  const apiKey = "122f927c1da14d06a9ee6050187e212d"; // Replace this with your key

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
            //console.log(result);
            const countryCode = result.components.country_code?.toUpperCase();
             
               const locationName =
               result.components.county??
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
          setError(`Error getting location from GPS:${err}`);
        }
      },
      (err) => {
        setError(`Permission denied or unavailable:${err}`);
      }
    );
  }, []);

  return (
    <div className="flex items-center gap-1.5 mr-3 max-w-full flex-wrap sm:flex-nowrap">
  <p className="text-lg">📍</p>

  <div className="flex-1 min-w-0">
    {locationData ? (
      <p className="font-medium text-white truncate w-32 sm:w-40">
        {!locationData.city ? locationData.town : locationData.city}, {locationData.state}
      </p>
    ) : (
      <p className="text-sm text-white truncate w-32 sm:w-40">
        {error || "Detecting location..."}
      </p>
    )}
  </div>

  <UserLoacation onLocationChange={setLocationData} />
</div>

  );
};

export default Location;

