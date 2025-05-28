import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/axios";
import { Button, Modal, Box, Typography } from "@mui/material";

function Sala() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [horarioReserva, setHorarioReserva] = useState(null);

  const getHorariosSala = async (data) => {
    console.log("get horarios..........");
    if (!data) return;

    setCarregando(true);
    setErro(null);
    try {
      const response = await api.getHorariosSala(id, data);
      console.log("reponse da data: ", response.data.horarios.horariosDisponiveis);
      setHorarios(response.data.horarios.horariosDisponiveis);
      
    } catch (error) {
      console.log("Erro ao buscar horários:", error);
      setErro("Não foi possível carregar os horários.");
    } finally {
      setCarregando(false);
    }
  };

  const reservarHorario = async () => {
    if (!horarioReserva) return;

    try {
      console.log("valorers para api: ", id, data, horarioReserva);
      const response = await api.postReservarHorario({
        
        sala: id,
        data: data, // Adiciona a data à requisição de reserva
        horario: horarioReserva // Passa o objeto completo do horário, se a API espera assim
      });
      
      alert("Reserva realizada com sucesso!");
      setModalOpen(false);
      // Recarrega os horários para refletir a reserva
      getHorariosSala(data); 

    } catch (error) {
      console.log("Erro ao realizar a reserva:", error.response.data.error); // Melhor para depuração
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    if (data) getHorariosSala(data);
  }, [data]);

  return (
    <div style={{ fontFamily: "Arial", padding: "16px", background: "#f9f9f9", marginTop: "60px" }}>
      <div style={{ background: "#b22222", color: "white", padding: "12px", borderRadius: "4px" }}>
        <h1 style={{ margin: 0 }}>Reserva para Sala {id}</h1>
      </div>

      <div style={{ marginTop: "16px" }}>
        <label><strong>Escolha a data:</strong></label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{ marginLeft: "8px", padding: "4px" }}
        />
      </div>

      <div style={{ marginTop: "20px", backgroundColor: "#ffecec", padding: "16px", borderRadius: "8px" }}>
        {carregando ? (
          <p>Carregando horários...</p>
        ) : erro ? (
          <p>{erro}</p>
        ) : horarios.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {horarios.map((h, index) => {
              const reservado = h.reservado; 
              const selecionado = horarioReserva?.inicio === h.inicio && horarioReserva?.fim === h.fim;

              return (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => {
                    if (!reservado) {
                      setHorarioReserva(h);
                    }
                  }}
                  sx={{
                    minWidth: "100px",
                    border: selecionado ? "2px solid #b22222" : "1px solid gray",
                    backgroundColor: reservado ? "#f44336" : "#a5d6a7",
                    color: reservado ? "white" : "black",
                    "&:hover": {
                      backgroundColor: reservado ? "#f44336" : "#81c784",
                    },
                  }}
                  disabled={reservado}
                >
                  {h.inicio} - {h.fim}
                </Button>
              );
            })}
          </div>
        ) : data ? (
          <p>Nenhum horário disponível para esta data.</p>
        ) : (
          <p>Escolha uma data para ver os horários.</p>
        )}
      </div>

      {horarioReserva && (
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Reservar
          </Button>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#b22222",
              color: "white",
              padding: "12px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            RESERVAR
          </Box>

          <Box sx={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              SALA: {`Sala ${id}`}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              DATA: {new Date(data).toLocaleDateString("pt-BR")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              HORÁRIO: {horarioReserva?.inicio} - {horarioReserva?.fim}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                onClick={reservarHorario}
                sx={{
                  backgroundColor: "#81c784",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#66bb6a",
                  },
                }}
              >
                CONFIRMAR
              </Button>
              <Button
                variant="contained"
                onClick={() => setModalOpen(false)}
                sx={{
                  backgroundColor: "#ef9a9a",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#e57373",
                  },
                }}
              >
                CANCELAR
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Sala;