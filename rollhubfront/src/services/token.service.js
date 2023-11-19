const saveToken = (token) => {
    localStorage.setItem('token', token)
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
    saveToken, logout, isLogged, getToken
}