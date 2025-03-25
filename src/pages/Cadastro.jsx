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
            padding: 2.5, // Reduzido de 3 para 2.5
            borderRadius: 2,
            width: "320px", // Tamanho fixo mais reduzido
            maxHeight: "80vh",
          }}
        >
          <Box sx={{ marginBottom: 1 }}>
            <img
              src={senaiLogo}
              alt="SENAI Logo"
              style={{ height: "55px", borderRadius: 2 }} // Reduzido de 55px para 45px
            />
          </Box>

          <Box
            component="form"
            sx={{ mt: 0.5, width: "100%" }} // Reduzido de 1 para 0.5
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
              //size="small"
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
              //size="small" // Adicionado para diminuir ainda mais o tamanho
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
              //size="small" // Adicionado para diminuir ainda mais o tamanho
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
              //size="small" // Adicionado para diminuir ainda mais o tamanho
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
                fontSize: "12px", // Texto menor para o link
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
      </Box>
      <Footer/>
    </Box>
  );
}
export default Cadastro;