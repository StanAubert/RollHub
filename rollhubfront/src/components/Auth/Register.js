import React, {useState} from 'react';
import styled from "styled-components";
import {getAllUsers} from "../../api";
import {tokenService} from "../../services/token.service";
import {Link, useNavigate} from "react-router-dom";
import {RegisterForm} from "../Forms/RegisterForm";


const Register = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        pseudo:""
    })
    const [error, setError] = useState("")
    const registerUrl= getAllUsers();
    const navigate = useNavigate();

    return (
        <>
            <h1>RollHub</h1>
            <h3>Nouveau compte</h3>

            <RegisterForm/>
            <p>Déjà membre ? <Link to={"/login"}>Connexion</Link></p>
        </>
    )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  input{
    padding: 0.4rem;
  }
  
  button{
    border: none;
    background-color: #282c34;
    color: #F5F5F5;
    padding: 0.4rem;
  }
`

const ErrorMessage = styled.p`
  padding: 2rem;
  background-color: firebrick;
  color: white;
  text-align: center;
`
export default Register;