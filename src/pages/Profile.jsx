import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import DefaultLayout from "../components/DefaultLayout";

const MeuPerfil = () => {
  const [userData, setUserData] = useState({
    nome: "",
    senha: "",
    email: "",
    cpf: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id_usuario = localStorage.getItem("id_usuario");

    if (!id_usuario) {
      navigate("/login");
      return;
    }

    const getUserInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getUserByID(id_usuario);
        setUserData({
          nome: response.data.user.nome || "",
          email: response.data.user.email || "",
          cpf: response.data.user.cpf || "",
          senha: "",
        });
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setError("Não foi possível carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [navigate]);

  const handleMinhasReservas = () => {
    navigate("/minhasReservas");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setError(null);
    setSuccess(false);
    const id_usuario = localStorage.getItem("id_usuario");
    api
      .getUserByID(id_usuario)
      .then((response) => {
        setUserData({
          nome: response.data.user.nome || "",
          email: response.data.user.email || "",
          cpf: response.data.user.cpf || "",
          senha: "",
        });
      })
      .catch((err) => console.error("Erro ao recarregar dados:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const id_usuario = localStorage.getItem("id_usuario");

      const dataToUpdate = {
        nome: userData.nome,
        email: userData.email,
        cpf: userData.cpf,
        id: id_usuario,
      };

      if (userData.senha) {
        dataToUpdate.senha = userData.senha;
      }

      await api.updateUser(dataToUpdate);

      setSuccess(true);
      setIsEditing(false);

      const response = await api.getUserByID(id_usuario);
      setUserData({
        id_usuario: response.data.user.id_usuario || "",
        nome: response.data.user.nome || "",
        email: response.data.user.email || "",
        cpf: response.data.user.cpf || "",
        senha: "",
      });
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError(
        err.response?.data?.error || "Erro ao atualizar o perfil. Verifique seus dados e tente novamente."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DefaultLayout headerRender={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#FFE9E9",
          }}
        >
          <CircularProgress sx={{ color: "#B9181D" }} />
        </Box>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout headerRender={1}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#FFE9E9",
          display: "flex",
          flexDirection: "column",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            padding: 2,
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
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#B9181D",
                borderRadius: "50%",
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "3px solid white",
                marginBottom: 2,
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  fill="white"
                />
                <path
                  d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                  fill="white"
                />
              </svg>
            </Box>

            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "white",
                fontWeight: "bold",
                marginBottom: 3,
                textAlign: "center",
              }}
            >
              {userData.nome || "NOME DO USUÁRIO"}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%", marginBottom: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ width: "100%", marginBottom: 2 }}>
                Perfil atualizado com sucesso!
              </Alert>
            )}

            {/* Nome */}
            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <Typography variant="body1" sx={labelStyle}>
                NOME
              </Typography>
              <TextField
                fullWidth
                name="nome"
                value={userData.nome}
                onChange={handleChange}
                disabled={!isEditing}
                sx={textFieldStyle}
              />
            </Box>

            {/* Email */}
            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <Typography variant="body1" sx={labelStyle}>
                EMAIL
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                sx={textFieldStyle}
              />
            </Box>

            {/* Senha */}
            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <Typography variant="body1" sx={labelStyle}>
                {isEditing ? "NOVA SENHA" : "SENHA"}
              </Typography>
              <TextField
                fullWidth
                name="senha"
                type="password"
                value={isEditing ? userData.senha : "********"}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Digite a nova senha" : ""}
                sx={textFieldStyle}
              />
            </Box>

            {/* CPF */}
            <Box sx={{ width: "100%", marginBottom: 3 }}>
              <Typography variant="body1" sx={labelStyle}>
                CPF
              </Typography>
              <TextField
                fullWidth
                name="cpf"
                value={userData.cpf || ""}
                disabled
                sx={textFieldStyle}
              />
            </Box>

            {isEditing ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleSaveClick}
                  disabled={saving}
                  sx={{
                    backgroundColor: "white",
                    color: "#B9181D",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    width: "48%",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  {saving ? (
                    <CircularProgress size={24} sx={{ color: "#B9181D" }} />
                  ) : (
                    "Salvar"
                  )}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancelClick}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    width: "48%",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Cancelar
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={handleEditClick}
                sx={{
                  backgroundColor: "white",
                  color: "#B9181D",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  marginBottom: "7px",
                  width: "100%",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Editar Perfil
              </Button>
            )}

            {!isEditing && (
              <Button
                variant="contained"
                onClick={handleMinhasReservas}
                sx={{
                  backgroundColor: "white",
                  color: "#B9181D",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  width: "100%",
                  borderRadius: 1,
                  marginTop: "25px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Minhas reservas
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default MeuPerfil;

const labelStyle = {
  color: "white",
  marginBottom: 0.5,
  marginRight: "auto",
  fontWeight: "bold",
};

const textFieldStyle = {
  marginBottom: 2,
  backgroundColor: "white",
  borderRadius: 1,
  "& .MuiInputBase-input": {
    color: "#333",
    fontWeight: "medium",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#333",
    fontWeight: "medium",
  },
};
