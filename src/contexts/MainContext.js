import React from "react";

// Define tus variables
export const mainVariables = {
  ENVIRONMENT: "DEV",
  ICONZISE: 20,
  PERIODS: null,
  BUDGETSBYPERIOD: null,
  SPENGINGBYBUDGET: null,
  SELECTEDPERIOD: null,
};

export const MainContext = React.createContext(mainVariables);
