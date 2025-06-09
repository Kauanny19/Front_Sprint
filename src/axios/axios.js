// axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.77:3000/api",
  headers: { accept: "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  postLogin: (user) => api.post("/user/login", user),
  updateUser: (data) => api.put(`/user/`, data),
  getUserByID: (id_usuario) => api.get(`/user/${id_usuario}`),
  postCadastro: (user) => api.post("/user", user),
  deleteUser: (id_usuario) => api.delete(`/user/${id_usuario}`),

  getSalas: () => api.get("/sala"),
  getHorariosSala: (id_sala, data) => api.get(`/reserva/horarios/${id_sala}/${data}`),
  
  postReservarHorario: (reserva) => api.post("/reserva", reserva),
  getHorariosSalaReservada: (id_sala, data) => api.get(`/reserva/horarios/${id_sala}/${data}`),
  getReservas: (id_usuario) => api.get(`/reserva/usuario/${id_usuario}`),
  deleteReservas: (id_reserva) => api.delete(`/reserva/${id_reserva}`)
};

export default sheets;
