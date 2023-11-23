import React from 'react';
import {useFormik} from "formik";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {tokenService} from "../../services/token.service";
import {loginSchema} from "./Schemas";
import {UserService} from "../../services/user.service";
import {setCurrUser} from "../../redux";
import {useDispatch} from "react-redux";


export const LoginForm = ({setLoading, setError}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
     const onSubmit = () => {
        tokenService.login(values)
            .then(res => {
                tokenService.saveToken(res.data.token, res.data.data.id, res.data.data.roles)
                UserService.currentUser()
                    .then(res => dispatch(setCurrUser(res.data)))
                    .catch(err => {
                        setLoading(false)
                        console.log(err)
                    })
                setLoading(false)
                navigate("/")
            } )
            .catch(err => {
                setError("Identifiants inconnus")
            })

    }

    const {values,touched, errors, handleBlur,handleChange, handleSubmit, handleReset} = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit:onSubmit
    })
    return (
        <Form onSubmit={handleSubmit}>

            <input
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                type="email"
                id="username"
                className={errors.username && touched.username ? "input-error" : ""}
            />
            {errors.username && touched.username && <p className={"error-message"}>{errors.username}</p>}
            <input
                id="password"
                type="password"
                placeholder="Mot de passe"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password && touched.password ? "input-error" : ""}
            />
            {errors.password && touched.password && <p className={"error-message"}>{errors.password}</p>}


            <button type="submit" onClick={onSubmit} > Enregistrer </button>
        </Form>
    );
};

const FormInfo = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  margin: 0 auto ;
  align-items: flex-start;
  gap: 0.6rem ;

  input[type="text"]{
    padding: 0.4rem;
  }

  .input-error{
    border:1px solid firebrick;
  }
  .error-message{
    color: firebrick;
  }
`

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

  .input-error{
    border:1px solid firebrick;
  }
  .error-message{
    color: firebrick;
  }
`

