import React, { useState, useEffect } from "react";
import api from "../axios/axios";
import { Box, Typography, Paper } from "@mui/material";

function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
  });

  return (
    <Box
      sx={{
        fontFamily: "Arial",
        padding: "16px",
        background: "#f9f9f9",
        marginTop: "60px",
        minHeight: "calc(100vh - 120px)",
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
                  backgroundColor: "#b22222",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "12px",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {date}
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
                      backgroundColor: "#D32F2F",
                      color: "white",
                      padding: "16px",
                      borderRadius: "8px",
                      minWidth: "280px",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                      {reserva.horario_inicio} - {reserva.horario_fim}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                      <strong>Descrição:</strong> {reserva.descricao_sala || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Número:</strong> {reserva.numero_sala || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Capacidade:</strong> {reserva.capacidade_sala || "N/A"} pessoas
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default MinhasReservas;
