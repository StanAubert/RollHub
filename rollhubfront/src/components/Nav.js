import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

const Nav = () => {

    const [mode, setMode] = useState("light")

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
    return (
        <>
            <header>
                <Navbar>
                    <ul>
                        <li><Link to={"/home"} >Accueil</Link></li>
                        <li><Link to={"/Admin"}>Admin</Link></li>
                    </ul>

                    <button onClick={onChangeMode}> Mode </button>
                </Navbar>
            </header>
        </>
    );

}

const Navbar = styled.nav`
  background-color: #282c34;
  ul{
    list-style: none;
    padding: 0;
    
    ul li{
      color: #F5F5F5;
      display: inline-block;
    }
  }

`
export default Nav