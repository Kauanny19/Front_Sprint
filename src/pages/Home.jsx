import { useState, useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, Container, Typography, InputBase, Box } from "@mui/material";
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

  const listSalas = salas.map((sala) => {
    return (
      <TableRow key={sala.id_usuario}>
        <TableCell align="center">{sala.numero}</TableCell>
        <TableCell align="center">{sala.descricao}</TableCell>
        <TableCell align="center">{sala.capacidade}</TableCell>
      </TableRow>
    );
  });

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
        padding: 2
      }}
    >
      <div style={{
        position: "fixed",
        marginTop: 5,
        right: 30,
        zIndex: 1100,
        display: "flex",
        alignItems: "center"
      }}>
        <span style={{ color: "white", fontWeight: "bold", fontSize: "20px", fontFamily: "Arial" }}>
          HOME
        </span>
      </div>
      <Container sx={{ mt: 10, mb: 4 }}>
        <HeaderLogo />
        <Paper
          component="form"
          sx={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: "100%",
            mb: 3
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Pesquisar"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Paper>
        <Grid container spacing={2}>
        {salas.length === 0 ? (
          <Typography xs={20} sx={{ textAlign: 'center' }}>Carregando Salas...</Typography>
        ) : (

          salas.map((sala) => (
            <Grid item xs={12} sm={6} md={4} key={sala.id_usuario}>
              <Paper
                sx={{
                  height: 150,
                  backgroundColor: '#B22222',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {sala.descricao}
                </Typography>
                <Typography variant="subtitle1">
                  Sala {sala.numero}
                </Typography>
                <Typography variant="body2">
                  Máx. {sala.capacidade} pessoas
                </Typography>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
      </Container>
      
      <Footer />
    </div>
  );
}
export default listSalas;
