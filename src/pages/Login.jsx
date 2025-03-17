import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios/axios";
import senaiLogo from "../assets/senai_logo.png";

function Login() {
  const [user, setUser] = useState({
    email: "",
    senha: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    await api.postLogin(user).then(
      (response) => {
        alert(response.data.message);
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
  }

  return (
    <Box sx={{ 
      height: "100vh", 
      backgroundColor: "#FFE9E9", 
      display: "flex", 
      flexDirection: "column",
    }}>
      <Box sx={{ 
        backgroundColor: "#C91E1E",
        height: "50px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 900,
          pointerEvents: "none", // Permite clicar em elementos abaixo
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#AE0000",
            padding: 2.5,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "320px", // Tamanho fixo mais reduzido
            maxHeight: "80vh",
            overflowY: "auto",
            pointerEvents: "auto", // Permite interação com este elemento
          }}
        >
          <Box sx={{ marginBottom: 1 }}>
            <img
              src={senaiLogo}
              alt="SENAI Logo"
              style={{ height: "45px", borderRadius: 2 }}
            />
          </Box>

          <Box 
            component="form" 
            sx={{ mt: 0.5, width: "100%" }} 
            onSubmit={handleSubmit} 
            noValidate
          >
            <TextField
              required
              fullWidth
              id="email"
              placeholder="Email"
              name="email"
              margin="dense"
              size="small"
              value={user.email}
              onChange={onChange}
              sx={{
                marginBottom: 1,
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
            <TextField
              required
              fullWidth
              id="senha"
              placeholder="Senha"
              name="senha"
              margin="dense"
              size="small"
              type="password"
              value={user.senha}
              onChange={onChange}
              sx={{
                marginBottom: 1,
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
            <Button
              sx={{
                mt: 0.5,
                mb: 1.5,
                backgroundColor: "#FF2A2A",
                borderRadius: 1,
                boxShadow: "none",
                padding: "6px 12px",
                fontSize: "0.875rem",
              }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Login
            </Button>

            <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                color: "white",
                fontSize: "0.75rem",
              }}>
              <Typography variant="body2" sx={{ color: "white", mr: 1, fontSize: "0.75rem" }}>
                Não tem cadastro?
              </Typography>
              <Link 
                to="/cadastro" 
                style={{ 
                  color: "#FF9696", 
                  textDecoration: "none", 
                  fontFamily: "Arial, sans-serif"
                }}
              >
                Cadastrar-se
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ 
          backgroundColor: "#C91E1E",
          height: "50px",
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 1000,
        }} />
    </Box>
  );
}
export default Login;