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
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        height: "100vh",
        backgroundColor: "#FFE9E9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {salas.length === 0 ? (
        <h1>Carregando Salas...</h1>
      ) : (
        <div>
          <h5>Lista Salas</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
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
