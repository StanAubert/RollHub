export const BASE_URL = 'http://localhost:8000'
export const API_BASE_URL = 'http://localhost:8000/api'

// USERS

export const getAllUsers = () => `${API_BASE_URL}/users`
export const login = () => `${API_BASE_URL}/login_check`

export  const logout = () => `${API_BASE_URL}/logout`