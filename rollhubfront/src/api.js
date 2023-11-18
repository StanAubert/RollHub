export const BASE_URL = process.env.BASE_URL
export const API_BASE_URL = process.env.API_BASE_URL

// USERS

export const getAllUsers = () => `${API_BASE_URL}/users`
export const login = () => `${API_BASE_URL}/login_check`