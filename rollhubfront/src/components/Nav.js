import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Moon, Sun} from "react-feather";

const Nav = ({role}) => {
    const [theme, setTheme] = useState("light")

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
    return (
        <>
            <header>
                <Navbar className={theme}>
                    <ul>
                        <li><Link to={"/home"} >Accueil</Link></li>
                        {
                            role === "admin" &&
                                <li><Link to={"/admin"}>Admin</Link></li>
                        }
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
      color: #F5F5F5;
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