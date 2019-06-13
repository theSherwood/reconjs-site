import React, { createContext, useContext, useReducer } from "react";

export const VictorsContext = createContext();

export const VictorsProvider = ({ reducer, initialVictors, children }) => (
  <VictorsContext.Provider value={useReducer(reducer, initialVictors)}>
    {children}
  </VictorsContext.Provider>
);

export const useVictorsValue = () => useContext(VictorsContext);
