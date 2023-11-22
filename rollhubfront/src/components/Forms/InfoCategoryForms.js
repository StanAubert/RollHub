import React from 'react';
import {useFormik} from "formik";
import ModalStructure from "../modal/ModalStructure";
import styled from "styled-components";
import {infoCategorySchema} from "./Schemas";

export  const InfoCategoryForm = ({close, infocat}) => {
    const {values,touched, errors, handleBlur,handleChange, handleSubmit, handleReset} = useFormik({
        initialValues: {
            title: infocat.title ?? "",
            color: infocat.color ?? ""
        },
        validationSchema: infoCategorySchema,
    })
    return (
        <ModalStructure close={close}>
            <FormInfoCat onSubmit={handleSubmit}>
                <label htmlFor="title" > Titre de la catégorie</label>
                <input
                    value={values.title}
                    onChange={handleChange}
                    type="text" id="title" placeholder="Titre"
                    onBlur={handleBlur}
                    className={errors.title && touched.title ? "input-error" : ""}
                />
                {errors.title && touched.title && <p className={"error-message"}>{errors.title}</p>}
                <label htmlFor="color" id="color"> Couleur de la catégorie </label>
                <input
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="color" id="color"
                    className={errors.color && touched.color ? "input-error" : ""}
                />
                {errors.color && touched.color && <p className={"error-message"}>{errors.color}</p>}
                <button type="submit" > Ajouter </button>
            </FormInfoCat>
        </ModalStructure>
    );
};

const FormInfoCat = styled.form`
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
