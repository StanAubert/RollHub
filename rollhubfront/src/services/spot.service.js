import Axios from "./caller.service";

const getAllSpots = () => {
    return Axios.get('/spot')
}

const getOneSpot = (id) => {
    return Axios.get('/spot/' + id)
}
export const SpotService = {
    getOneSpot, getAllSpots
}