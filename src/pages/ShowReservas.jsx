import React from "react";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";

const ShowReservas = ({ reservas, onAtualizar, onExcluir }) => {
  const reservasPorData = reservas.reduce((acc, reserva) => {
    const data = new Date(reserva.data_inicio).toLocaleDateString("pt-BR");
    if (!acc[data]) acc[data] = [];
    acc[data].push(reserva);
    return acc;
  }, {});

  return (
    <Box sx={{ padding: "70px 16px 70px 16px" }}> {/* padding compensando o Header e Footer fixos */}
      {/* Botões de ação */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" color="error" onClick={onAtualizar}>
          ATUALIZAR RESERVA
        </Button>
        <Button variant="contained" color="error" onClick={onExcluir}>
          EXCLUIR RESERVA
        </Button>
        <Button variant="contained" color="error">
          MINHAS RESERVAS
        </Button>
      </Box>

      {/* Listagem de reservas agrupadas por data */}
      {Object.entries(reservasPorData).map(([data, reservasData]) => (
        <Box key={data} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {data}
          </Typography>
          {reservasData.map((reserva, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: "#B92626",
                  color: "white",
                  padding: 1,
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "4px",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {reserva.titulo}
                </Typography>
              </Box>
              <CardContent>
                <Typography>Sala: {reserva.sala}</Typography>
                <Typography>Capacidade: {reserva.capacidade}</Typography>
                <Typography>
                  {reserva.horario_inicio} - {reserva.horario_fim}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default ShowReservas;
