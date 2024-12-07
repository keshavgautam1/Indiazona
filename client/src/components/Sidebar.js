import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, Info as InfoIcon } from "@mui/icons-material";

import HomeIcon from "@mui/icons-material/Home";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import GroupsIcon from "@mui/icons-material/Groups";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import MessageIcon from "@mui/icons-material/Message";
import InterestsIcon from "@mui/icons-material/Interests";
import CampaignIcon from "@mui/icons-material/Campaign";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LanguageIcon from "@mui/icons-material/Language";

import Indiazona from "../assets/Indianzona.png";

const sidebarItems = [
  { title: "Dashboard", icon: <HomeIcon /> },
  { title: "Partner", icon: <GroupAddIcon /> },
  { title: "Products", icon: <ShoppingCartIcon /> },
  { title: "Sales", icon: <TrendingUpIcon /> },
  {
    title: "Items",
    icon: <WidgetsIcon />,
    subItems: [
      "Categories",
      "Sub-Categories",
      "Specification",
      "HSN List",
      "Logistics Rate",
      "Brand List",
    ],
  },
  { title: "Refunds", icon: <CurrencyRupeeIcon /> },
  { title: "Customers", icon: <GroupsIcon /> },
  {
    title: "Sellers",
    icon: <MedicalServicesIcon />,
    subItems: ["Seller 1", "Seller 2", "Seller 3"],
  },
  { title: "Reports", icon: <InfoIcon /> },
  { title: "Uploaded Files", icon: <DocumentScannerIcon /> },
  { title: "BLog System", icon: <MessageIcon /> },
  { title: "Doodle", icon: <InterestsIcon /> },
  {
    title: "Marketing",
    icon: <CampaignIcon />,
  },
  { title: "Support", icon: <SupportAgentIcon /> },
  { title: "Website Setup", icon: <LanguageIcon /> },
  {
    title: "Staff Management",
    icon: <GroupsIcon />,
    subItems: [
      "Part-Time Employees",
      "Interns",
      "Full-Time Employees",
      "Contractors/Freelancers",
      "Remote Staff",
      "Shift Workers",
    ],
  },
];

const Sidebar = ({ onSectionChange }) => {
  const [openItems, setOpenItems] = React.useState({});
  const [activeSection, setActiveSection] = React.useState(""); // State for active section

  const toggleDropdown = (title) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          padding: "15px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        <img
          src={Indiazona}
          alt="Logo"
          style={{
            height: "40px",
            width: "auto",
          }}
        />
      </Typography>
      <List>
        {sidebarItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              onClick={() =>
                item.subItems
                  ? toggleDropdown(item.title)
                  : handleSectionChange(item.title)
              }
              sx={{
                backgroundColor:
                  activeSection === item.title ? "#1976d2" : "transparent",
                color: activeSection === item.title ? "#fff" : "inherit",
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
                transition: "background-color 0.3s ease",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
              {item.subItems &&
                (openItems[item.title] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.subItems && (
              <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItem
                      button
                      key={subIndex}
                      sx={{
                        pl: 4,
                        "&:hover": {
                          backgroundColor: "#f1f1f1",
                        },
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => handleSectionChange(subItem)}
                    >
                      <ListItemText primary={subItem} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
