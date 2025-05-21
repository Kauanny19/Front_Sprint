import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
} from "@mui/material";
import api from "../axios/axios";

function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalAtualizar, setModalAtualizar] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const fetchReservas = async () => {
    try {
      const response = await api.get("/reservas/minhas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReservas(response.data);
    } catch (err) {
      console.error("Erro ao buscar reservas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleExcluir = async () => {
    try {
      await api.delete(`/reservas/${reservaSelecionada.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Reserva excluída com sucesso.");
      setModalExcluir(false);
      fetchReservas();
    } catch (err) {
      console.error("Erro ao excluir reserva:", err);
      alert("Erro ao excluir reserva.");
    }
  };

  const handleAtualizar = async () => {
    try {
      await api.put(`/reservas/${reservaSelecionada.id}`, reservaSelecionada, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Reserva atualizada.");
      setModalAtualizar(false);
      fetchReservas();
    } catch (err) {
      alert("Erro ao atualizar.");
    }
  };

  return (
    <Box sx={{ mt: 10, px: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Minhas Reservas
      </Typography>

      {loading ? (
        <Typography>Carregando...</Typography>
      ) : reservas.length === 0 ? (
        <Typography>Você não possui reservas.</Typography>
      ) : (
        reservas.map((reserva) => (
          <Card key={reserva.id} sx={{ mb: 2, backgroundColor: "#ffecec" }}>
            <CardContent>
              <Typography variant="h6">{reserva.sala}</Typography>
              <Typography variant="body2">
                {new Date(reserva.data).toLocaleDateString("pt-BR")} |{" "}
                {reserva.inicio} - {reserva.fim}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setReservaSelecionada(reserva);
                    setModalExcluir(true);
                  }}
                >
                  Excluir
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setReservaSelecionada(reserva);
                    setModalAtualizar(true);
                  }}
                >
                  Atualizar
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      {/* Modal de Exclusão */}
      <Modal open={modalExcluir} onClose={() => setModalExcluir(false)}>
        <Box sx={modalBoxStyle}>
          <Typography variant="h6">Excluir Reserva</Typography>
          <Typography sx={{ mt: 2 }}>
            Deseja excluir a reserva de {reservaSelecionada?.sala} em{" "}
            {new Date(reservaSelecionada?.data).toLocaleDateString("pt-BR")}?
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button onClick={() => setModalExcluir(false)}>Cancelar</Button>
            <Button onClick={handleExcluir} variant="contained" color="error">
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal de Atualização */}
      <Modal open={modalAtualizar} onClose={() => setModalAtualizar(false)}>
        <Box sx={modalBoxStyle}>
          <Typography variant="h6">Atualizar Reserva</Typography>
          {/* Aqui você pode colocar inputs para alterar a hora, sala, etc. */}
          <Typography sx={{ mt: 2 }}>
            (Funcionalidade de alteração completa pode ser implementada aqui.)
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button onClick={() => setModalAtualizar(false)}>Cancelar</Button>
            <Button onClick={handleAtualizar} variant="contained" color="primary">
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default MinhasReservas;
