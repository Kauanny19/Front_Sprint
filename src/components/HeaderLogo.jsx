import * as React from "react";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom"; // IMPORTANTE

function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate(); // HOOK DE NAVEGAÇÃO

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Define o nome e a rota de cada item
  const menuItems = [
    { label: "HOME", path: "/home" },
    { label: "MINHAS RESERVAS", path: "/reservas" },
    { label: "TODAS AS SALAS", path: "/home" },
    { label: "MEU PERFIL", path: "/reservas" },
    
  ];

  return (
    <>
      {/* HEADER */}
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
          px: 2,
          zIndex: 1300,
        }}
      >
        <IconButton onClick={toggleDrawer(true)}>
          <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>

        <Typography variant="h6" sx={{ color: "white", ml: 2 }}>
          HOME
        </Typography>
      </Box>

      {/* DRAWER LATERAL */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, backgroundColor: "#B71C1C", height: "100%" }}
          role="presentation"
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => {
                  navigate(item.path);  // NAVEGA PARA A ROTA
                  setDrawerOpen(false); // FECHA O DRAWER
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ sx: { color: "white", fontWeight: "bold" } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
