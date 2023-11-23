import Axios from "./caller.service";

const getAllInfos = () => {
    return Axios.get('/info')
}

const getOneInfo = (id) => {
    return Axios.get('/info/' + id)
}

const addInfo = (data) => {
    return Axios.post('/info/new', data)
}

const editInfo = (id, data) => {
    return Axios.put(`/info/${id}/edit`, data)
}

const deleteInfo = (id) => {
    return Axios.delete(`info/${id}`)
}
export const InfoService = {
    getAllInfos, getOneInfo, addInfo, editInfo, deleteInfo
}