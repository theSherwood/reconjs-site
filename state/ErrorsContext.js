import React, { createContext, useContext, useReducer } from "react";

export const ErrorsContext = createContext();

export const ErrorsProvider = ({ reducer, initialErrors, children }) => (
  <ErrorsContext.Provider value={useReducer(reducer, initialErrors)}>
    {children}
  </ErrorsContext.Provider>
);

export const useErrorsValue = () => useContext(ErrorsContext);
