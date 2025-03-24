import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderLogo";
import Footer from "../components/Footer";
import LogoSenai from "../assets/senai_logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
      }}
    >
       <div style={{
        position: "fixed",
        top: 0,
        right: 20,
        zIndex: 1100,
        height: "50px",
        display: "flex",
        alignItems: "center"
      }}>
        <AccountCircleIcon/>
        <span style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>
          HOME
        </span>
      </div>
      {salas.length === 0 ? (
        <Container>
          <Header/>
          <h1 style={{margin:350, justifyContent:"center",}}>Carregando Salas...</h1>
          <Footer/>
        </Container>
        
      ) : (

        <div>
          <Header/> 
          <div style={{ display: "flex", justifyContent: "center" }}> {/* Container para centralizar a tabela */}
          <TableContainer component={Paper} style={{ 
                margin: "2px",
                maxWidth: "80%" // Limita a largura da tabela para melhor aparência
              }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "brown", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">Número</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Capacidade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listSalas}</TableBody>
            </Table>
          </TableContainer>
          </div>
          <Button fullWidth variant="contained" onClick={logout}>
            SAIR
          </Button>
        </div>
      )}
      <Footer/>
    </div>
  );
}
export default listSalas;
