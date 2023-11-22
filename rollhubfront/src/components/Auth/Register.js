import React, {useState} from 'react';
import styled from "styled-components";
import {getAllUsers} from "../../api";
import {tokenService} from "../../services/token.service";
import {Link, useNavigate} from "react-router-dom";
import Axios from "../../services/caller.service";


const Register = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        pseudo:""
    })
    const [error, setError] = useState("")
    const registerUrl= getAllUsers();
    const navigate = useNavigate();


    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        tokenService.register(data)
            .then(res => {
                navigate("/login")
            })
            .catch(err => {
                console.log(err);
                setError("Une erreur est survenue : " + err.response.data)
            });
    }

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }
    return (
        <>
            <h1>RollHub</h1>
            <div>
                <h3>Nouveau compte</h3>
                <Form onSubmit={onSubmit}>
                    <input type="email" placeholder={"Email"} name="email" value={data.email} onChange={onChange}/>
                    <input type="text" placeholder={"Pseudo"} name="pseudo" value={data.pseudo} onChange={onChange}/>
                    <input type="password" placeholder={"Mot de passe"} name="password" value={data.password} onChange={onChange}/>
                    <button> Enregistrer </button>
                </Form>
                <p>Déjà membre ? <Link to={"/login"}>Connexion</Link></p>

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
export default Register;