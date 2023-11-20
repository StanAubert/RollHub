import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Moon, Sun} from "react-feather";
import {logout} from "../api";
import LogoutModal from "./modal/LogoutModal";
import {tokenService} from "../services/token.service";
import {useDispatch, useSelector} from "react-redux";

const Nav = ({role}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const RTheme = useSelector(state => state.theme.theme)
    const currUser = useSelector(state => state.theme.currUser)
    const [theme, setTheme] = useState(RTheme)


    const dispatch = useDispatch()

    const changeTheme = () => {
        dispatch({type: "theme/setTheme", payload: theme})
    }
    useEffect(() => {
        if(theme !== RTheme){
            changeTheme()
        }
    }, [theme]);


    const onChangeMode = () =>{
        switch (theme){
            case "light":
                setTheme("dark")
                return;
            case "dark":
                setTheme("light")
                return;
            default:
                return;
        }
    }

    const openModal = () => {
        setIsOpenModal(true)
        console.log(isOpenModal)
    }
    const logoutURL= logout()
    const navigate = useNavigate();
    const onLogout = () => {
        tokenService.logout()
        navigate("/login")
    }
    return (
        <>
            {
                isOpenModal &&
                <LogoutModal logout={onLogout} close={() => {setIsOpenModal(false)}}/>
            }
            <header>
                <Navbar className={theme}>
                    <ul>
                        <li><Link to={"/home"} >Accueil</Link></li>
                        {
                            role === "admin" &&
                                <li><Link to={"/admin"}>Admin</Link></li>
                        }
                        <li> <p>{currUser.pseudo}</p> </li>
                        <li><a onClick={onLogout}>Déconnexion</a></li>
                    </ul>

                    <ThemeButton onClick={onChangeMode}>
                        {
                            theme === "dark" ? <Sun color={"#e3e723"} size={"32"}/> : <Moon color={"lightblue"} size={"32"}/>
                        }
                    </ThemeButton>
                </Navbar>

            </header>
        </>
    );

}

const Navbar = styled.nav`
  transition: all 0.5s ease;
  padding: 1rem;
  box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
  ul{
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    li{
      cursor: pointer;
      font-size: 1.5rem;
      padding: 0.5rem;
    }
  }

`

const ThemeButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0.8rem;
`
export default Nav