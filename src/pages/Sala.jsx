import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/HeaderLogo";
import Footer from "../components/Footer";

function Sala() {
  return (
    <Box>
      <Header />
      <Typography fontSize={30} sx={{ textAlign: "center", marginTop:10 }}>
        Sala
      </Typography>
      <Footer />
    </Box>
  );
}

export default Sala;
