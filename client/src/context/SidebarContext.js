import React, { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState("Dashboard"); // Default title

  return (
    <SidebarContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
