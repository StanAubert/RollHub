import Axios from "./caller.service";

const getAllSpots = () => {
    return Axios.get('/spot')
}

const getOneSpot = (id) => {
    return Axios.get('/spot/' + id)
}

const addSpot = (data) => {
    return Axios.post('/spot/new', data)
}

const editSpot = (id, data) => {
    return Axios.put(`/spot/${id}/edit`, data)
}

const deleteSpot = (id) => {
    return Axios.delete(`/spot/${id}`)
}
export const SpotService = {
    getOneSpot, getAllSpots, addSpot, editSpot, deleteSpot
}