import Axios from "./caller.service";

let getAllUsers = () => {
    return Axios.get('/users')
}

let getUser = (id) => {

}

export const UserService = {
    getAllUsers, getUser
}