import React from 'react';
import {useFormik} from "formik";
import ModalStructure from "../modal/ModalStructure";
import styled from "styled-components";

export  const InfoCategoryForm = ({close}) => {
    const formik = useFormik({
        initialValues: {
            title: "",
            color: ""
        }
    })
    return (
        <ModalStructure close={close}>
            <FormInfoCat>
                <label htmlFor="title" > Titre de la catégorie</label>
                <input
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    type="text" id="title" placeholder="Titre"
                    onBlur={formik.handleBlur}
                />
                <label htmlFor="color" id="color"> Couleur de la catégorie </label>
                <input
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="color" id="color"
                />
                <button type="submit"> Ajouter </button>
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
`
