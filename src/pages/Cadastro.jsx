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
import Header from "../components/Header";
import Footer from "../components/Footer";

function Cadastro() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastro();
  };

  async function cadastro() {
    await api.postCadastro(user).then(
      (response) => {
        alert(response.data.message);
        navigate("/");
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#FFE9E9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Box sx={{ display: "flex", flexGrow: 1, height: "100%" }}>
        {/* Imagem esquerda como plano de fundo */}
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
          <Box sx={{ marginBottom: 1 }}>
            <img
              src={senaiLogo}
              alt="SENAI Logo"
              style={{ height: "55px", borderRadius: 2 }}
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
              id="nome"
              placeholder="Nome"
              name="nome"
              margin="dense"
              value={user.nome}
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
              id="email"
              placeholder="Email"
              name="email"
              margin="dense"
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
              id="cpf"
              placeholder="CPF"
              name="cpf"
              margin="dense"
              value={user.cpf}
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
                padding: "7px 12px",
                fontSize: "13px",
              }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Cadastrar
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
              }}
            >
              <Typography variant="body2" sx={{ color: "white", mr: 1 }}>
                Já tem cadastro?
              </Typography>
              <Link
                to="/"
                style={{
                  color: "#FF9696",
                  textDecoration: "none",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Login
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

export default Cadastro;
