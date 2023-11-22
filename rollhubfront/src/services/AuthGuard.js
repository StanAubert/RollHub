import {Navigate, useNavigate} from "react-router-dom";
import {tokenService} from "./token.service";
import NotFound from "../components/Base/NotFound";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {UserService} from "./user.service";
import {setCurrUser} from "../redux";

const AuthGuard = ({children}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        UserService.currentUser()
            .then(res => dispatch(setCurrUser(res.data)))
            .catch(err => {
                console.log(err)
                navigate("/login")
            })
    },[])
    let logged = tokenService.isLogged()
    if(!logged){
        return <Navigate to={"/login"}/>
    }

    return children
}

export default AuthGuard