import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, Container, Typography, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeaderLogo from "../components/HeaderLogo";
import Footer from "../components/Footer";
import Grid from '@mui/material/Grid';

function listSalas() {
  const [salas, setSalas] = useState([]);
  const navigate = useNavigate();

  async function getSalas() {
    // Chamada da Api
    await api.getSalas().then(
      (response) => {
        console.log(response.data.salas);
        setSalas(response.data.salas);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  useEffect(() => {
    getSalas();
  }, []);

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "#FFE9E9",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <div
        style={{
          position: "fixed",
          marginTop: 5,
          right: 30,
          zIndex: 1100, //Garante que fique acima do header
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "Arial",
          }}
        >
          HOME
        </span>
      </div>
      <Container sx={{ mt: 8, mb: 4}}>
        <HeaderLogo />
        <Paper
          component="form"
          sx={{
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "60%",
            mb: 3,
            mx: "auto",
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Pesquisar"
            inputProps={{ "aria-label": "search" }}
          />
        </Paper>
        <Grid container spacing={7}>

          {salas.length === 0 ? (
            <Typography xs={20} sx={{ textAlign: "center" }}>
              Carregando Salas...
            </Typography>
          ) : (
            salas.map((sala) => (
              <Grid item xs={12} sm={6} md={4} key={sala.id_usuario}>

                <Paper
                  sx={{
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: 2,
                    backgroundColor: "white",
                  }}
                  onClick={() => navigate("/sala")}
                  style={{ cursor: 'pointer' }} 
                >
                  {/* Nome da sala no topo do cartão */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#D32F2F",
                      padding: "10px",
                      borderRadius: 1,
                      width: "95%",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {sala.descricao}
                  </Typography>

                  {/* Grid interno para organizar o conteúdo (número e capacidade) */}
                  <Grid container sx={{ flexDirection: "column", gap: 1, width: "100%" }}>

                    {/* Número da sala */}
                    <Typography
                      variant="subtitle1"
                      fontSize={20}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        padding: "0 0 0 25px",
                      }}
                    >
                      Sala {sala.numero}
                    </Typography>

                    <Typography
                      variant="body2"
                      fontSize={14}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        padding: "0 0 18px 25px",
                      }}
                    >
                      Máx. {sala.capacidade} pessoas
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
        <Button
          fullWidth
          variant="contained"
          onClick={logout}
          style={{ marginTop: 10, marginBottom: 10, background: "#B92626" }}
        >
          SAIR
        </Button>
      </Container>

      <Footer />
    </div>
  );
}

export default listSalas;