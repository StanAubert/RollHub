import Axios from "./caller.service";

const login = (credentials) => {
    return Axios.post('/login_check', credentials)
}

const register = (data) => {
    return Axios.post('/user/register', data)
}
const saveToken = (token, id) => {
    localStorage.setItem('token', token)
    localStorage.setItem('currentUID', id)
}

const logout = () => {
    localStorage.removeItem('token')
}

const isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

const getToken = () => {
    return localStorage.getItem('token')
}


export const tokenService = {
    saveToken, logout, isLogged, getToken,login, register
}