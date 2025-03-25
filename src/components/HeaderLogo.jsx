import * as React from "react";
import Box from "@mui/material/Box";
import LogoSenai from "../assets/senai_logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Header(){
    return(
        <Box sx={{ 
            backgroundColor: "#C91E1E",
            height: "50px",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            display: "flex",
            justifyContent: "flex-start", // Muda de "center" para "flex-end"
            alignItems: "center",
            
          }}>
            <AccountCircleIcon style={{ fontSize: 45, alignContent:"end", margin:20, color: "white" }}/>
          </Box>
    )
}


export default Header;