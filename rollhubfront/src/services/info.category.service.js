import Axios from "./caller.service";

const getAllInfoCategories = () =>{
    return Axios.get('/info/category')
}

const getOneInfoCategory = (id) => {
    return Axios.get('/info/category/' + id)
}

const addInfoCategory = (data) => {
    return Axios.post('/info/new', data)
}

const editInfoCategory = (id, data) => {
    return Axios.put(`/info/${id}/edit`, data)
}

const deleteInfoCategory = (id) => {
    return Axios.delete(`info/$id`)
}
export const InfoCategoryService = {
    getAllInfoCategories, getOneInfoCategory, addInfoCategory, editInfoCategory, deleteInfoCategory
}