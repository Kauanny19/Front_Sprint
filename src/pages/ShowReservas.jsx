import React, { useState, useEffect } from "react";
import api from "../axios/axios";
import { Box, Typography, Paper, Button, Fade } from "@mui/material";

function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReserva, setSelectedReserva] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      setLoading(true);
      const id_usuario = localStorage.getItem("id_usuario");
      if (!id_usuario) {
        console.error("ID do usuário não encontrado no localStorage.");
        setError("Erro: ID do usuário não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }
      try {
        const response = await api.getReservas(id_usuario);
        setReservas(response.data.reservas || []);
      } catch (err) {
        console.error("Erro ao buscar minhas reservas:", err);
        setError("Não foi possível carregar suas reservas.");
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);
  const groupReservationsByDate = (reservations) => {
    const grouped = {};
    reservations.forEach((reserva) => {
      const date = new Date(reserva.data + 'T00:00:00').toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      });
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(reserva);
    });
    return grouped;
  };

  const groupedReservations = groupReservationsByDate(reservas);
  const sortedDates = Object.keys(groupedReservations).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split("/").map(Number);
    const [dayB, monthB, yearB] = b.split("/").map(Number);
    return (
      new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
    );
  });
  const handleDelete = async (id_reserva) => {
    try {
      await api.deleteReservas(id_reserva);

      setReservas((prev) =>
        prev.filter((reserva) => reserva.id_reserva !== id_reserva)
      );

      setSelectedReserva(null);
      console.log("Reserva deletada com sucesso.");
    } catch (err) {
      console.error("Erro ao deletar reserva:", err);
      alert("Erro ao deletar reserva. Tente novamente.");
    }
  };

  return (
    <Box
      sx={{
        fontFamily: "Arial",
        backgroundColor: "#ffecec",
        minHeight: "100vh",
        padding: "5px 0"
      }}
    >
      {loading && <Typography>Carregando suas reservas...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && reservas.length === 0 && (
        <Typography>Você ainda não tem nenhuma reserva.</Typography>
      )}
      {!loading && !error && reservas.length > 0 && (
        <Box>
          {sortedDates.map((date) => (
            <Box key={date} >
              <Box
                sx={{
                  background: "#ffc6c6",
                  color: "black",
                  padding: "12px 24px",
                  width: "100%",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "60px",
                  marginBottom:"10px"
                }}
              >
                {date.replace(/\//g, " - ")}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                {groupedReservations[date].map((reserva) => (
                  <Paper
                    key={reserva.id_reserva}
                    onClick={() => setSelectedReserva(reserva)}
                    sx={{
                        height:180,
                      borderRadius: "8px",
                      border: "1px solid #b22222",
                      minWidth: 250,
                      cursor: "pointer",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      marginLeft:"15px"
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#b22222",
                        color: "#fff",
                        padding: "15px",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      {reserva.descricao || "Disciplina"}
                    </Box>
                    <Box
                      sx={{
                        padding: "10px",
                        flexGrow: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: "17px", }}>
                        Sala {reserva.nomeSala || "N/A"}
                      </Typography>
                      <Typography sx={{ fontSize: "17px" }}>
                        Máx. {reserva.capacidade || "N/A"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        padding: "8px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {reserva.horarioInicio} - {reserva.horarioFim}
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {/* Modal com reserva selecionada */}
      {selectedReserva && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          }}
          onClick={() => setSelectedReserva(null)}
        >
          <Fade in={true}>
            <Paper
              elevation={4}
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                paddingTop: "72px",
                paddingX: "20px",
                paddingBottom: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                minWidth: "300px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: "#b22222",
                  color: "white",
                  padding: "12px 0",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              >
                RESERVA
              </Box>
              <Typography align="center" sx={{ mt: 1 }}>
                <strong>SALA:</strong> {selectedReserva.nomeSala}
              </Typography>
              <Typography align="center">
                <strong>DATA:</strong>{" "}
                {new Date(selectedReserva.data + 'T00:00:00').toLocaleDateString("pt-BR", { timeZone: 'UTC' })}
              </Typography>
              <Typography align="center">
                <strong>HORÁRIO:</strong> {selectedReserva.horarioInicio} -{" "}
                {selectedReserva.horarioFim}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f8bfbf",
                    color: "#b22222",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#f28c8c" },
                  }}
                  onClick={() => handleDelete(selectedReserva.id_reserva)}
                >
                  DELETAR RESERVA
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#b22222" }}
                  onClick={() => setSelectedReserva(null)}
                >
                  Fechar
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Box>
      )}
    </Box>
  );
}
export default MinhasReservas;
