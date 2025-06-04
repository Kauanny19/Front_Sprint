import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, Container, Typography, InputBase, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeaderLogo from "../components/HeaderLogo";
import Footer from "../components/Footer";
import Grid from '@mui/material/Grid';

function ListSalas() {
  const [salas, setSalas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Adicionado estado para pesquisa
  const navigate = useNavigate();

 const handleSalaSelect = (sala) => {
  localStorage.setItem("salaSelecionada", JSON.stringify(sala));
  navigate(`/sala/${sala.id_sala}`);
}

  async function getSalas() {
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
    <Box
      style={{
        height: "100%",
        backgroundColor: "#FFE9E9",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Box
        style={{
          position: "fixed",
          right: 20,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "Arial",
          }}
        >
          HOME
        </Typography>
      </Box>
      
      <Container sx={{ mt: 8, mb: 4 }}>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Paper>

        <Grid container spacing={7}>
          {salas.length === 0 ? (
            <Typography xs={20} sx={{ textAlign: "center" }}>
              Carregando Salas...
            </Typography>
          ) : (
            salas
              .filter((sala) =>
                sala.descricao.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((sala) => (
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
                    onClick={() => handleSalaSelect(sala)}
                    style={{ cursor: 'pointer' }} 
                  >
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

                    <Grid container sx={{ flexDirection: "column", gap: 1, width: "100%" }}>
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
    </Box>
  );
}

export default ListSalas;
