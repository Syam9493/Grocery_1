import React from "react";
import { useEffect, useState } from "react";

const Location = () => {
  //const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("");
  //console.log(address);

  // const getUserLocation = () => {
  //   if (!navigator.geolocation) {
  //     setError("Geolocation is not supported by your browser");
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setLocation({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //     },
  //     (err) => {
  //       setError(err.message);
  //     },
  //     {
  //       enableHighAccuracy: true, // Use GPS if available
  //       timeout: 10000,
  //       maximumAge: 0,
  //     }
  //   );
  // };

  // useEffect(() => {
  //   getUserLocation();
  // }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        //setLocation({ lat, lng });

        // Send to OpenCage
        // for pull data into github
        //fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=YOUR_API_KEY`)
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=122f927c1da14d06a9ee6050187e212d`
        )
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
            setAddress(data.results[0].components);
            // if (data.results.length > 0) {
            //   setAddress(data.results[0].formatted);
            // }
          });
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  }, []);
  return (
    <div className="flex items-center gap-1.5">
      <p className="size-5">📌</p>
      <p className="font-sans font-semibold text-[1rem]">{address.village},</p>
      <p className="font-sans font-semibold text-[1rem]">{address.country}</p>
    </div>
  );
};

export default Location;
