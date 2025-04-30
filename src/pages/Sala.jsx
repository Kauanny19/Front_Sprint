import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Sala() {
  const { id } = useParams(); // pega o ID da sala da URL
  const [data, setData] = useState(""); // data escolhida pelo usuário
  const [horarios, setHorarios] = useState([]); // horários disponíveis
  const [carregando, setCarregando] = useState(false); // status de carregamento

  // Busca os horários disponíveis com base na data
  const getHorariosSala = async () => {
    if (!data) return;

    setCarregando(true);
    try {
      const response = await axios.get(`http://10.89.240.69:3000/api/reserva/horarios/${id}/${data}`);
      console.log("Horários disponíveis:", response.data.horariosDisponiveis);
      setHorarios(response.data.horariosDisponiveis);
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
    } finally {
      setCarregando(false);
    }
  };

  // chama a API sempre que a data mudar
  useEffect(() => {
    getHorariosSala();
  }, [data]);

  return (
    <div>
      <h1>Reserva para Sala {id}</h1>

      <label>Escolha a data:</label>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      {carregando ? (
        <p>Carregando horários...</p>
      ) : horarios.length > 0 ? (
        <ul>
          {horarios.map((h, index) => (
            <li key={index}>
              {h.inicio} - {h.fim} <button>Reservar</button>
            </li>
          ))}
        </ul>
      ) : data ? (
        <p>Nenhum horário disponível para esta data.</p>
      ) : (
        <p>Escolha uma data para ver os horários.</p>
      )}
    </div>
  );

  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModalIngresso = (evento) => {
  setEventoSelecionado(evento);
  setModalOpen(true);
};

const fecharModalIngresso = () => {
  setModalOpen(false);
  setEventoSelecionado("");
};


















}





export default Sala;
