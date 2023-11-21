import Axios from "./caller.service";

const getAllInfoCategories = () =>{
    return Axios.get('/info/category')
}

const getOneInfoCategory = (id) => {
    return Axios.get('/info/category/' + id)
}
export const InfoCategoryService = {
    getAllInfoCategories, getOneInfoCategory
}