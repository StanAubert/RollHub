import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Moon, Sun} from "react-feather";
import {logout} from "../api";
import LogoutModal from "./modal/LogoutModal";
import {tokenService} from "../services/token.service";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrUser, setTheme} from "../redux";
import logo from '../images/RollHubMini-transparent.svg'

const Nav = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const RTheme = useSelector(state => state.theme.theme)
    const currUser = useSelector(state => state.theme.currUser)
    const isAdmin = currUser?.roles?.includes("ROLE_ADMIN")
    const [mode, setMode] = useState(RTheme)


    const dispatch = useDispatch()

    const changeTheme = () => {
        dispatch(setTheme(mode))
    }
    useEffect(() => {
        if(mode !== RTheme){
            changeTheme()
        }
    }, [mode]);


    const onChangeMode = () =>{
        switch (mode){
            case "light":
                setMode("dark")
                return;
            case "dark":
                setMode("light")
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
        dispatch(clearCurrUser())
        navigate("/login")
    }
    return (
        <>
            {
                isOpenModal &&
                <LogoutModal logout={onLogout} close={() => {setIsOpenModal(false)}}/>
            }
            <header>
                <Navbar className={mode}>
                    <Logo src={logo} alt=""/>
                    <NavBlock>
                        <ul>
                            <li><Link to={"/home"} >Accueil</Link></li>
                            {
                                isAdmin &&
                                <li><Link to={"/admin/users"}>Admin</Link></li>
                            }
                            <li> <p>{currUser.pseudo}</p> </li>
                            <li><a onClick={onLogout}>Déconnexion</a></li>
                        </ul>

                        <ThemeButton onClick={onChangeMode}>
                            {
                                mode === "dark" ? <Sun color={"#e3e723"} size={"32"}/> : <Moon color={"lightblue"} size={"32"}/>
                            }
                        </ThemeButton>
                    </NavBlock>
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
  justify-content: space-between;
  align-items: center;
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
const NavBlock = styled.nav`
  display: flex;
  
`
const ThemeButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0.8rem;
  cursor: pointer;
`

const Logo = styled.img`
  max-width: 70px;
`
export default Nav