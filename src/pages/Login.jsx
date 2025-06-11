import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios/axios";
import senaiLogo from "../assets/senai_logo.png";
import fotologin1 from "../assets/fotologin1.png";
import fotologin2 from "../assets/fotologin2.png";
import fotologin3 from "../assets/fotologin3.png";
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
        localStorage.setItem("authenticated", true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id_usuario", response.data.user.id_usuario);
        navigate("home/");
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
  }

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#FFE9E9", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box sx={{ display: "flex", flexGrow: 1, height: "100%" }}>
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${fotologin1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Formulário central */}
        <Box
          sx={{
            width: "360px",
            backgroundColor: "#AE0000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
          }}
        >
          <img
            src={senaiLogo}
            alt="SENAI Logo"
            style={{ height: "55px", borderRadius: 2 }}
          />

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

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "13px",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "white", mr: 1, fontSize: "13px" }}
              >
                Não tem cadastro?
              </Typography>
              <Link
                to="/cadastro"
                style={{
                  color: "#FF9696",
                  textDecoration: "none",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Cadastrar-se
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Imagem direita como plano de fundo */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${fotologin2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Box>

      <Footer />
    </Box>
  );
}

export default Login;
