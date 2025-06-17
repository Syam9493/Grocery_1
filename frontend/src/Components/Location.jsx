import React from "react";

const Location = () => {
  const Location = () => {
    const location = navigator.geolocation.getCurrentPosition();
    console.log(location);
  };

  return <div></div>;
};

export default Location;
