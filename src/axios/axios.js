import axios from "axios"

const api = axios.create({
    baseURL: "http://10.89.240.69:3000/api",
    headers: {'accept':'application/json'}
});

const sheets = {
    postLogin: (user) => api.post("/user/login", user),
    postCadastro:(user) => api.post("/user", user),
    getSalas: (sala) => api.get("/sala", sala),
    
}

export default sheets;