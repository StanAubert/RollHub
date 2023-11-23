import Axios from "./caller.service";

let getAllUsers = () => {
    return Axios.get('/users')
}

let getUser = (id) => {
    return Axios.get(`/users/${id}`)
}

const currentUser = () => {
    let id = localStorage.getItem('currentUID')
    return Axios.get(`/users/${id}`)
}

const editUser = (id, data) => {
    return Axios.put(`/users/${id}/edit`, data)
}
const deleteUser = (id) => {
    return Axios.delete(`/users/${id}`)
}
export const UserService = {
    getAllUsers, getUser, currentUser, deleteUser, editUser
}