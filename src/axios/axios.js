import axios from "axios"

const api = axios.create({
    baseURL: "http://192.168.100.94:3000/api",
    headers: {'accept':'application/json'}
});

const sheets = {
    postLogin: (user) => api.post("/user/login", user),
    postCadastro:(user) => api.post("/user", user),
    getSalas: (sala) => api.get("/sala", sala),
    
}

export default sheets;