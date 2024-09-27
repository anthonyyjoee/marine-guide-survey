import React, { createContext, useContext } from "react";
import { StatusBar } from "react-native";

const StatusBarContext = createContext();

export const StatusBarProvider = ({ children }) => {
  return (
    <StatusBarContext.Provider value={null}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      {children}
    </StatusBarContext.Provider>
  );
};

export const useStatusBar = () => useContext(StatusBarContext);
