import { Navigate } from "react-router-dom";
import {tokenService} from "./token.service";

const AuthGuard = () => {
    if(!tokenService.isLogged()){
        return <Navigate to={}/>
    }
}