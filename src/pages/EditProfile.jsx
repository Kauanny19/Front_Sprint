import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import DefaultLayout from "../components/DefaultLayout";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para recuperar o ID do usuário do localStorage
  const idlocalstorage = () => {
    const id = localStorage.getItem("id_usuario");
    if (!id) {
      console.error("ID do usuário não encontrado no localStorage.");
    }
    return id;
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await api.getUserByID(id_usuario);
        setUserData(response.data.user);
      } catch (error) {
        console.log("Erro ao buscar usuário:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    const id_usuario = idlocalstorage();
    if (!id_usuario) return;

    setLoading(true);
    try {
      await api.updateUser({
        id: idlocalstorage,
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        cpf: userData.cpf // se o backend exige
      });
      alert("Dados atualizados com sucesso!");
      navigate("/meuPerfil");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <DefaultLayout headerRender={1}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#FFE9E9",
          display: "flex",
          flexDirection: "column",
          paddingTop: "60px",
          paddingBottom: "60px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            padding: 2
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "500px",
              backgroundColor: "#B9181D",
              borderRadius: 2,
              padding: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold", marginBottom: 3 }}
            >
              Editar Perfil
            </Typography>

            {/* Nome */}
            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <Typography variant="body1" sx={labelStyle}>
                Nome
              </Typography>
              <TextField
                fullWidth
                name="nome"
                value={userData.nome}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Box>

            {/* Email */}
            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <Typography variant="body1" sx={labelStyle}>
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Box>

            {/* Senha */}
            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <Typography variant="body1" sx={labelStyle}>
                Senha
              </Typography>
              <TextField
                fullWidth
                name="senha"
                type="password"
                value={userData.senha}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Box>

            {/* CPF (apenas leitura) */}
            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <Typography variant="body1" sx={labelStyle}>
                CPF
              </Typography>
              <TextField
                fullWidth
                value={userData.cpf}
                disabled
                sx={textFieldStyle}
              />
            </Box>

            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              sx={{
                backgroundColor: "white",
                color: "#B9181D",
                fontWeight: "bold",
                padding: "10px 20px",
                width: "100%",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#f0f0f0"
                }
              }}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default EditProfile;

const labelStyle = {
  color: "white",
  marginBottom: 0.5,
  marginRight: "auto",
  fontWeight: "bold"
};

const textFieldStyle = {
  marginBottom: 2,
  backgroundColor: "white",
  borderRadius: 1
};
