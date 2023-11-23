import React from 'react';
import {useFormik} from "formik";
import ModalStructure from "../modal/ModalStructure";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {registerSchema} from "./Schemas";
import {tokenService} from "../../services/token.service";


export const RegisterForm = () => {

    const navigate = useNavigate();
    const onSubmit = () => {
        tokenService.register(values)
            .then(res => {
                navigate("/login")
            })
            .catch(err => {
                console.log(err)
            })

    }

    const {values,touched, errors, handleBlur,handleChange, handleSubmit, handleReset} = useFormik({
        initialValues: {
            pseudo:"",
            email: "",
            password: "",
        },
        validationSchema: registerSchema,
        onSubmit:onSubmit
    })
    return (
            <Form onSubmit={handleSubmit}>
                <input
                    value={values.pseudo}
                    onChange={handleChange}
                    type="text"
                    id="pseudo"
                    placeholder="Pseudo"
                    onBlur={handleBlur}
                    className={errors.pseudo && touched.pseudo ? "input-error" : ""}
                />
                {errors.pseudo && touched.pseudo && <p className={"error-message"}>{errors.pseudo}</p>}

                <input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    type="email"
                    id="email"
                    className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email && <p className={"error-message"}>{errors.email}</p>}
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

