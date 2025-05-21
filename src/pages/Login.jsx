import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios/axios";
import senaiLogo from "../assets/senai_logo.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const [user, setUser] = useState({
    email: "",
    senha: "",
  });
  const navigate = useNavigate();
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
        localStorage.setItem('authenticated', true)
        localStorage.setItem("token", response.data.token)
        navigate("home/")
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
      
      <Header/>

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
            height:"350px",
            width: "320px", // Tamanho fixo mais reduzido
            maxHeight: "80vh",
          }}
        >
          <Box sx={{ mt: 2  }}>
            <img
              src={senaiLogo}
              alt="SENAI Logo"
              style={{ height: "55px", borderRadius: 2 }}
            />
          </Box>

          <Box 
            component="form" 
            sx={{ mt: 3, width: "100%" }} 
            onSubmit={handleSubmit} 
            noValidate
          >
            <TextField
              required
              fullWidth
              id="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={onChange}
              sx={{
                marginBottom: 3.5,
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
              type="password"
              value={user.senha}
              onChange={onChange}
              sx={{
                marginBottom: 3,
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
            <Button
              sx={{
                mt: 0.5,
                mb: 2,
                backgroundColor: "#FF2A2A",
                borderRadius: 1,
                boxShadow: "none",
                padding: "7px 12px",
                fontSize: "13px",
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
                fontSize: "13px",
              }}>
              <Typography variant="body2" sx={{ color: "white", mr: 1, fontSize: "13px" }}>
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

      <Footer/>
    </Box>
  );
}
export default Login;

