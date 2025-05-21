import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import DefaultLayout from "../components/DefaultLayout";

function MeuPerfil() {
  const [userData, setUserData] = useState({
    nome: "",
    cpf: "",
    senha: "",
    email: ""
  });
  
  const navigate = useNavigate();

  // Função para buscar os dados do usuário do backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Supondo que você tenha um endpoint para obter os dados do usuário logado
        const response = await api.getUserData();
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  // Função para ir para a página de reservas
  const handleMinhasReservas = () => {
    navigate("/minhasReservas");
  };

  return (
    <DefaultLayout headerRender={1}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#FFE9E9",
          display: "flex",
          flexDirection: "column",
          paddingTop: "60px", // Espaço para o header
          paddingBottom: "60px" // Espaço para o footer
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
            {/* Ícone do perfil */}
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

            {/* Nome */}
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

            {/* Campos de dados */}
            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  marginBottom: 0.5,
                  marginRight: "auto",
                  fontWeight: "bold"
                }}
              >
                CPF
              </Typography>
              <TextField
                fullWidth
                value={userData.cpf}
                disabled
                sx={{
                  marginBottom: 2,
                  backgroundColor: "white",
                  borderRadius: 1,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#333",
                    fontWeight: "medium"
                  }
                }}
              />
            </Box>

            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  marginBottom: 0.5,
                  marginRight: "auto",
                  fontWeight: "bold"
                }}
              >
                SENHA
              </Typography>
              <TextField
                fullWidth
                type="password"
                value={userData.senha}
                disabled
                sx={{
                  marginBottom: 2,
                  backgroundColor: "white",
                  borderRadius: 1,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#333",
                    fontWeight: "medium"
                  }
                }}
              />
            </Box>

            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  marginBottom: 0.5,
                  marginRight: "auto",
                  fontWeight: "bold"
                }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                value={userData.email}
                disabled
                sx={{
                  marginBottom: 2,
                  backgroundColor: "white",
                  borderRadius: 1,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#333",
                    fontWeight: "medium"
                  }
                }}
              />
            </Box>

            {/* Botão Minhas Reservas */}
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
                "&:hover": {
                  backgroundColor: "#f0f0f0"
                }
              }}
            >
              Minhas reservas
            </Button>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
}

export default MeuPerfil;