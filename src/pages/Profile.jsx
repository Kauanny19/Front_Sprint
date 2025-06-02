import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios"; // Assumindo que 'api' tem o método para atualizar o usuário
import DefaultLayout from "../components/DefaultLayout";

const MeuPerfil = () => {
  const [userData, setUserData] = useState({
    nome: "",
    senha: "", // Para o input de senha
    email: "",
    cpf: ""
  });
  const [isEditing, setIsEditing] = useState(false); // Novo estado para controlar o modo de edição
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // Novo estado para o processo de salvamento
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
        setError(null); // Limpa erros anteriores
        const response = await api.getUserByID(id_usuario); // Essa requisição já usará o token
        console.log("Dados do usuário retornados da API:", response.data);
        // Ao carregar, não preenchemos a senha por segurança
        setUserData({
          nome: response.data.user.nome || "",
          email: response.data.user.email || "",
          cpf: response.data.user.cpf || "",
          senha: "" // Sempre inicia vazio para edição de senha
        });
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setError("Não foi possível carregar os dados do usuário.");
        if (err.response?.data) {
          console.log("Detalhes do erro:", err.response.data);
        }
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
    setIsEditing(true); // Entra no modo de edição
    setError(null); // Limpa mensagens de erro ao entrar no modo de edição
    setSuccess(false); // Limpa mensagens de sucesso
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Sai do modo de edição
    setError(null); // Limpa mensagens de erro
    setSuccess(false); // Limpa mensagens de sucesso
    const id_usuario = localStorage.getItem("id_usuario");
    api.getUserByID(id_usuario) // Essa requisição já usará o token
        .then(response => {
            setUserData({
                nome: response.data.user.nome || "",
                email: response.data.user.email || "",
                cpf: response.data.user.cpf || "",
                senha: ""
            });
        })
        .catch(err => console.error("Erro ao recarregar dados:", err));
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
      const dataToUpdate = {
        nome: userData.nome,
        email: userData.email,
      };

      if (userData.senha) {
        dataToUpdate.senha = userData.senha;
      }

      // Esta chamada para updateUser já usará o token do interceptor
      await api.updateUser(dataToUpdate); 
      
      setSuccess(true);
      setIsEditing(false); 
      // Recarrega os dados do usuário após a atualização, também usando o token
      const id_usuario = localStorage.getItem("id_usuario");
      const response = await api.getUserByID(id_usuario);
      setUserData({
        nome: response.data.user.nome || "",
        email: response.data.user.email || "",
        cpf: response.data.user.cpf || "",
        senha: ""
      });

    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError("Erro ao atualizar o perfil. Verifique seus dados e tente novamente.");
      if (err.response?.data) {
        console.error("Detalhes do erro da API:", err.response.data);
        setError(err.response.data.message || error);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DefaultLayout headerRender={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: "#FFE9E9" }}>
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
                marginBottom: 2
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
                textAlign: "center"
              }}
            >
              {userData.nome || "NOME DO USUÁRIO"}
            </Typography>

            {error && <Alert severity="error" sx={{ width: "100%", marginBottom: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ width: "100%", marginBottom: 2 }}>Perfil atualizado com sucesso!</Alert>}

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
                InputProps={{
                  style: { color: '#333' }
                }}
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
                InputProps={{
                  style: { color: '#333' }
                }}
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
                placeholder={isEditing ? "Deixe em branco para manter a senha atual" : ""}
                sx={textFieldStyle}
                InputProps={{
                  style: { color: '#333' }
                }}
              />
            </Box>

            {/* CPF - Desabilitado sempre */}
            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <Typography variant="body1" sx={labelStyle}>
                CPF
              </Typography>
              <TextField
                fullWidth
                name="cpf"
                value={userData.cpf || ""}
                disabled
                sx={textFieldStyle}
                InputProps={{
                  style: { WebkitTextFillColor: "#333", fontWeight: "medium" }
                }}
              />
            </Box>

            {isEditing ? (
              <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
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
                      backgroundColor: "#f0f0f0"
                    }
                  }}
                >
                  {saving ? <CircularProgress size={24} sx={{ color: "#B9181D" }} /> : "Salvar"}
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
                      backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }
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
                  marginBottom: "25px",
                  width: "100%",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#f0f0f0"
                  }
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
                  marginTop: isEditing ? 0 : "25px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0"
                  }
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
  fontWeight: "bold"
};

const textFieldStyle = {
  marginBottom: 2,
  backgroundColor: "white",
  borderRadius: 1,
  "& .MuiInputBase-input": {
    color: "#333",
    fontWeight: "medium"
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#333",
    fontWeight: "medium"
  }
};