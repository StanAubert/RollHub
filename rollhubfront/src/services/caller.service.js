import axios from "axios";
import {tokenService} from "./token.service";

const Axios = axios.create({
    baseURL: "http://localhost:8000/api"
})

Axios.interceptors.request.use(request => {

    if(tokenService.isLogged()){
        request.headers.Authorization = 'Bearer ' + tokenService.getToken()
    }
    return request
})
export default Axios