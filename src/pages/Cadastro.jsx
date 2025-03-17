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

function Cadastro() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

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
      <Box //header
        sx={{
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
        }}
      />

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
            padding: 2.5, // Reduzido de 3 para 2.5
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
              style={{ height: "45px", borderRadius: 2 }} // Reduzido de 55px para 45px
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
              size="small"
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
              size="small" // Adicionado para diminuir ainda mais o tamanho
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
              size="small" // Adicionado para diminuir ainda mais o tamanho
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
              size="small" // Adicionado para diminuir ainda mais o tamanho
              sx={{
                marginBottom: 1,
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
            <Button
              sx={{
                mt: 0.5, // Reduzido de 1 para 0.5
                mb: 1.5, // Reduzido de 2 para 1.5
                backgroundColor: "#FF2A2A",
                borderRadius: 1,
                boxShadow: "none",
                padding: "6px 12px", // Tamanho reduzido para o botão
                fontSize: "0.875rem", // Texto menor
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
                fontSize: "0.75rem", // Texto menor para o link
              }}
            >
              <Typography variant="body2" sx={{ color: "white", mr: 1, fontSize: "0.75rem" }}>
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
      <Box
        sx={{
          backgroundColor: "#C91E1E",
          height: "50px",
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 1000,
        }}
      />
    </Box>
  );
}
export default Cadastro;