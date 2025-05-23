import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.77:3000/api",
  headers: { accept: "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  postLogin: (user) => api.post("/user/login", user),
  postCadastro: (user) => api.post("/user", user),
  postReservarHorario: (reserva) => api.post("/reserva", reserva),
  getSalas: (sala) => api.get("/sala", sala),
  getHorariosSala: (id_sala, data) => api.get(`/reserva/horarios/${id_sala}/${data}`),
};

export default sheets;
