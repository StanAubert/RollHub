import { Navigate } from "react-router-dom";
import {tokenService} from "./token.service";
import NotFound from "../components/Base/NotFound";

const AuthGuard = ({children}) => {
    let logged = tokenService.isLogged()
    let admin = true
    if(!logged){
        return <Navigate to={"/login"}/>
    }
    if(!admin) {
        return <NotFound/>
    }

    return children
}

export default AuthGuard