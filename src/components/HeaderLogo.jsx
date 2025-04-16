import * as React from "react";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";



function Header() {
  // const (DIA 16 CHAT)


  return (
    <Box
      sx={{
        backgroundColor: "#C91E1E",
        height: "50px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
        <IconButton>
          <AccountCircleIcon fontSize="large" sx={{color:"white"}} />
        </IconButton>
    </Box>
  );
}

export default Header;
