import React, {useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {login} from "../../api";
import {tokenService} from "../../services/token.service";
import {Link, useNavigate} from "react-router-dom";


const LoginPage = () => {
    const [cred, setCred] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("")
    const loginUrl= login();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        tokenService.login(cred)
            .then( res => {
                tokenService.saveToken(res.data.token)
                navigate("/")

            } )
            .catch(err => {
                setError("Identifiants inconnus")
            })
    }

    const onChange = (e) => {
        setCred({
            ...cred,
            [e.target.name] : e.target.value
        })
    }
    return (
        <>
            <h1>RollHub</h1>
            <div>
                <h3>Login</h3>
                <Form onSubmit={onSubmit}>
                    <input type="email" placeholder={"Email"} name="username" value={cred.username} onChange={onChange}/>
                    <input type="password" placeholder={"Mot de passe"} name="password" value={cred.password} onChange={onChange}/>
                    <button> Connexion </button>
                </Form>
                <p>Pas encore membre ? <Link to={"/register"}>Créer un compte</Link></p>

                {
                    error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
            </div>
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
export default LoginPage;