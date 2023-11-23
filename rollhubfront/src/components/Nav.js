import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styled, {css} from "styled-components";
import {Menu, Moon, Sun, X} from "react-feather";
import {logout} from "../api";
import LogoutModal from "./modal/LogoutModal";
import {tokenService} from "../services/token.service";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrUser, setTheme} from "../redux";
import logo from '../images/RollHubMini-transparent.svg'

const Nav = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
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
                    <MobileBlock>
                        <Logo src={logo} alt="logo rollhub" onClick={() => {navigate("/home")}}/>
                        {
                            menuOpen ?
                                <CloseMenuButton onClick={() => {setMenuOpen(false)}}> <X/> </CloseMenuButton>
                                :
                                <BurgerButton onClick={() => {setMenuOpen(true)}}> <Menu/> </BurgerButton>
                        }
                    </MobileBlock>
                    <NavBlock $mode={menuOpen}>
                        <ul>
                            <li><Link to={"/home"} >Carte</Link></li>
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
  flex-direction: column;
  align-items: center;
  ul{
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    li{
      cursor: pointer;
      font-size: 1.5rem;
      padding: 0.5rem;
    }
    li{
      transition: all 0.5s ease;
      width: 100%;
    }
    
  }
  
  @media screen and (min-width: 700px){
    flex-direction: row;
    justify-content: space-between;
    
    ul{
      flex-direction: row;
    }
    li:hover{
      background-color: initial;
      transform: translateY(-5%);
    }
    img:hover{
      rotate: 270deg;
    }
  }

`
const NavBlock = styled.nav`
  width: 100%;
  transition: all 0.5s ease;
  
  ${(props) => {
      switch (props.$mode){
        case true:
            return css`
              display: flex;
              align-items: center;
              justify-content: center;
            `
        case false:
            return css`
              display: none;
            `
      }
  }};

  @media screen and (min-width: 700px){
  display: flex;
}
`

const MobileBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const BurgerButton = styled.button`
  border: none;
  background-color: transparent;
  @media screen and (min-width: 700px){
    display: none;
  }
`

const CloseMenuButton = styled.button`
  border: none;
  background-color: transparent;
  @media screen and (min-width: 700px){
    display: none;
  }
`
const ThemeButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0.8rem;
  cursor: pointer;
  display: none;
  
  @media screen and (min-width: 700px){
    display: initial;
  }
`

const Logo = styled.img`
  max-width: 50px;
  cursor: pointer;
  transition: all 0.5s ease;

  @media screen and (min-width: 700px){
    max-width: 70px;
  }
`
export default Nav