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
      const date = new Date(reserva.data).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      if (!grouped[date]) {
        grouped[date] = [];
      }
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

  const handleDelete = (id) => {
    console.log("Deletar reserva:", id);
  };

  const handleUpdate = (reserva) => {
    console.log("Atualizar reserva:", reserva);
  };

  return (
    <Box
      sx={{
        fontFamily: "Arial",
        padding: "16px",
        background: "#f5f5f5",
        marginTop: "60px",
        minHeight: "calc(100vh - 120px)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#b22222",
          color: "white",
          padding: "12px",
          borderRadius: "4px",
          mb: 3,
        }}
      >
        <Typography variant="h5">Minhas Reservas</Typography>
      </Box>

      {loading && <Typography>Carregando suas reservas...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && reservas.length === 0 && (
        <Typography>Você ainda não tem nenhuma reserva.</Typography>
      )}

      {!loading && !error && reservas.length > 0 && (
        <Box>
          {sortedDates.map((date) => (
            <Box key={date} sx={{ marginBottom: "24px" }}>
              <Box
                sx={{
                  backgroundColor: "#ffcccc",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "12px",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {date.replace(/\//g, " - ")}
                </Typography>
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
                    sx={{
                      borderRadius: "8px",
                      minWidth: "180px",
                      overflow: "hidden",
                      border: "1px solid #D32F2F",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedReserva(reserva)}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#b22222",
                        color: "white",
                        padding: "8px",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {reserva.descricao || "Disciplina"}
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: "#f1f1ff",
                        padding: "12px",
                        flexGrow: 1,
                      }}
                    >
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Sala:</strong> {reserva.nomeSala || "N/A"}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Máx.:</strong> {reserva.capacidade || "N/A"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        padding: "8px",
                        textAlign: "center",
                        backgroundColor: "#fff",
                        borderTop: "1px solid #ccc",
                        fontWeight: "bold",
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
                overflow: "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabeçalho */}
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
                {new Date(selectedReserva.data).toLocaleDateString("pt-BR")}
              </Typography>
              <Typography align="center">
                <strong>HORÁRIO:</strong> {selectedReserva.horarioInicio} -{" "}
                {selectedReserva.horarioFim}
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
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
                  DELETAR
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#bff8bf",
                    color: "#2e7d32",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#94f294" },
                  }}
                  onClick={() => handleUpdate(selectedReserva)}
                >
                  ATUALIZAR
                </Button>
              </Box>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button variant="text" onClick={() => setSelectedReserva(null)}>
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
