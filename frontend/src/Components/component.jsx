import React, { createContext } from "react";

const contexProvider = createContext();

const component = () => {
  <contexProvider.Provider></contexProvider.Provider>;
};

export default component;
