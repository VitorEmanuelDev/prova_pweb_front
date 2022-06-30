import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080/'
})

//Login
export const createSession = async (email, password) =>{
    return await api.post("/login", {email, password});
}

//Usuario
export const getUsuario = async () =>{
    return await api.get("/");
}


export const getUsuarios = async () =>{
    return await api.get("/usuarios");
}

export const getUsuarioById = async (id) =>{
    return await api.get(`/usuario/${id}`);
}


export const getClientes = async () =>{
    return await api.get("/costumers");
}

export const getChamados = async () =>{
    return await api.get("/dashboard");
}

export const cadastrarCliente = async (cliente) =>{
    return await api.post("/costumers", cliente);
}

export const cadastrarUsuario = async (nome, email) =>{
    return await api.post("/profile", {nome, email});
}

export const cadastrarChamado = async (clienteId, nomeCliente, assunto, status, complemento) =>{
    return await api.post("/new", {clienteId, nomeCliente, assunto, status, complemento});
}

export const clientById = async (clienteId) =>{
    return await api.get(`/costumers/${clienteId}`);
}

export const deleteChamado = async (id) =>{
    return await api.delete(`/dashboard/${id}`);
}

export const updateChamado = async (id) =>{
    return await api.put(`/dashboard/${id}`);
}

export const deleteCliente = async (clienteId) =>{
    return await api.delete(`/costumers/${clienteId}`);
}

export const updateCliente = async (clienteId, cliente) => {
    return await api.put(`/costumers/${clienteId}`, cliente)
}