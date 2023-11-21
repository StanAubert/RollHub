import Axios from "./caller.service";

const getAllInfos = () => {
    return Axios.get('/info')
}

const getOneInfo = (id) => {
    return Axios.get('/info/' + id)
}

export const InfoService = {
    getAllInfos, getOneInfo
}