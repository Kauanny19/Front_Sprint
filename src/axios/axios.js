import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.77:3000/api",
  headers: { accept: "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  postLogin: (user) => api.post("/user/login", user),
  getUser: () => api.get("/user"), // Corrigido: removido parâmetro desnecessário
  getUserData: () => api.get("/user/profile"), // Método específico se existir endpoint diferente
  postCadastro: (user) => api.post("/user", user),
  postReservarHorario: (reserva) => api.post("/reserva", reserva),
  getSalas: (sala) => api.get("/sala", sala),
  getHorariosSala: (id_sala, data) => api.get(`/reserva/horarios/${id_sala}/${data}`),
};

export default sheets;