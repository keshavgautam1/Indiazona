import React, { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SubCategoriesPage from "./pages/subCategoriesPage";

const App = () => {
  const [currentSection, setCurrentSection] = useState("Dashboard");

  const renderContent = () => {
    switch (currentSection) {
      case "Dashboard":
        return <h1>Welcome to the Dashboard</h1>;
      case "Orders":
        return <h1>Orders Section</h1>;
      case "Category 1":
        return <h1>Category 1 Details</h1>;
      case "Products":
        return <h1>Products Section</h1>;
      case "Customers":
        return <h1>Customers Section</h1>;
      case "Sub-Categories":
        return <SubCategoriesPage />;
      default:
        return <h1>{currentSection} Page</h1>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar */}
      <Sidebar onSectionChange={setCurrentSection} />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <Navbar currentSection={currentSection} />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: "64px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          {renderContent()}{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
