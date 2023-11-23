import Axios from "./caller.service";

const login = (credentials) => {
    return Axios.post('/login_check', credentials)
}

const register = (data) => {
    return Axios.post('/users/register', data)
}
const saveToken = (token, id, roles) => {
    localStorage.setItem('token', token)
    localStorage.setItem('currentUID', id)
    localStorage.setItem('ROLES', roles)
}

const logout = () => {
    localStorage.removeItem('token')
}

const isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

const isAdmin = () => {
    return !!localStorage.getItem('ROLES').includes("ROLE_ADMIN")
}
const getToken = () => {
    return localStorage.getItem('token')
}


export const tokenService = {
    saveToken, logout, isLogged, getToken,login, register, isAdmin
}