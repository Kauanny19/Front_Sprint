import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
        backgroundColor: "#AE0000", 
        height: "40px", 
        width: "100%" 
      }} />

    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#AE0000",
          padding: 4,
          borderRadius: 2,
          boxShadow: "none",
         
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <img
            src={senaiLogo}
            alt="SENAI Logo"
            style={{ height: "65px", borderRadius: 2 }}
          />
        </Box>

        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
          <TextField
            required
            fullWidth
            id="email"
            placeholder="Email"
            name="email"
            margin="normal"
            value={user.email}
            onChange={onChange}
            sx={{
              marginBottom: 2,
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
            margin="normal"
            type="password"
            value={user.password}
            onChange={onChange}
            sx={{
              marginBottom: 2,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
          <Button
            sx={{
              mt: 1,
              mb: 3,
              backgroundColor: "#FF2A2A",
              borderRadius: 1,
              boxShadow: "none",
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
              color: "white"
            }}>
            <Typography variant="body2" sx={{ color: "white", mr: 1 }}>
              Não tem cadastro?
            </Typography>
            <Link to="/cadastro"  style={{ color: "#FF9696", textDecoration: "none", fontFamily: "Arial, sans-serif"}}>
              Cadastrar-se
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
    <Box sx={{ 
        backgroundColor: "#c62828", 
        height: "40px", 
        width: "100%",
        marginTop: "auto"
      }} />
    </Box>
  );
}
export default Login;
