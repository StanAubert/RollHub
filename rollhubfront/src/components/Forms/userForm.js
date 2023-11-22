import React from 'react';
import {useFormik} from "formik";
import ModalStructure from "../modal/ModalStructure";
import styled from "styled-components";
import { userSchema} from "./Schemas";
import {useNavigate} from "react-router-dom";
import {UserService} from "../../services/user.service";


export const UserForm = ({close, user}) => {

    const navigate = useNavigate();
    const onSubmit = () => {
        console.log(values)
        UserService.editUser(user.id,values)
            .then(res => {
                close()
            })
            .catch(err => {
                console.log(err)
            })

    }

    const {values,touched, errors, handleBlur,handleChange, handleSubmit, handleReset} = useFormik({
        initialValues: {
            pseudo: user.pseudo ?? "",
            email: user.email ?? "",
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            roles: user.roles ?? ""
        },
        validationSchema: userSchema,
        onSubmit:onSubmit
    })
    return (
        <ModalStructure close={close}>
            <FormInfo onSubmit={handleSubmit}>
                <label htmlFor="pseudo" > Pseudo </label>
                <input
                    value={values.pseudo}
                    onChange={handleChange}
                    type="text" id="pseudo" placeholder="Titre"
                    onBlur={handleBlur}
                    className={errors.pseudo && touched.pseudo ? "input-error" : ""}
                />
                {errors.pseudo && touched.pseudo && <p className={"error-message"}>{errors.pseudo}</p>}

                <label htmlFor="email" id="email"> Email </label>
                <input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email" id="email"
                    className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email && <p className={"error-message"}>{errors.email}</p>}

                <label htmlFor="firstName" id="firstName"> Prénom </label>
                <input
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text" id="firstName"
                    className={errors.firstName && touched.firstName ? "input-error" : ""}
                />
                {errors.firstName && touched.firstName && <p className={"error-message"}>{errors.firstName}</p>}

                <label htmlFor="lastName" id="lastName"> Nom </label>
                <input
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text" id="lastName"
                    className={errors.lastName && touched.lastName ? "input-error" : ""}
                />
                {errors.lastName && touched.lastName && <p className={"error-message"}>{errors.lastName}</p>}

                <label htmlFor="categories" id="categories">
                    Rôle
                </label>
                <select
                    name="roles"
                    id="roles"
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBlur}
                    value={values.roles}
                >
                    <option value="ROLE_USER">Utilisateur </option>
                    <option value="ROLE_ADMIN">Administrateur </option>
                </select>

                <button type="submit" onClick={onSubmit} > Enregistrer </button>
            </FormInfo>
        </ModalStructure>
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
