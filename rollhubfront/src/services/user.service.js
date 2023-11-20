import Axios from "./caller.service";

let getAllUsers = () => {
    return Axios.get('/users')
}

let getUser = (id) => {

}

const currentUser = () => {
    let id = localStorage.getItem('currentUID')
    return Axios.get(`/users/${id}`)
}

export const UserService = {
    getAllUsers, getUser, currentUser
}