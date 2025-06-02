import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.77:3000/api",
  headers: { accept: "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  postLogin: (user) => api.post("/user/login", user),
  getUserByID: (id_usuario) => api.get(`/user/${id_usuario}`),
  postCadastro: (user) => api.post("/user", user),
  postReservarHorario: (reserva) => api.post("/reserva", reserva),
  getSalas: () => api.get("/sala"),
  getHorariosSala: (id_sala, data) => api.get(`/reserva/horarios/${id_sala}/${data}`),
  getHorariosSalaReservada: (id_sala, data) => api.get(`/reserva/horarios/${id_sala}/${data}`),
  
  // Atualizado para usar a rota correta com a procedure
  getReservas: (id_usuario) => api.get(`/reserva/usuario/${id_usuario}`),
};

export default sheets;
