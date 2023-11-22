import React, {useEffect, useState} from 'react';
import {useField, useFormik} from "formik";
import ModalStructure from "../modal/ModalStructure";
import styled from "styled-components";
import {infoSchema} from "./Schemas";
import {useNavigate} from "react-router-dom";
import {InfoService} from "../../services/Info.service";
import {InfoCategoryService} from "../../services/info.category.service";


export  const InfoForm = ({close, info, infoCategories}) => {

    const navigate = useNavigate();
    const onSubmit = () => {
        values.categories = [values.categories]
        if(info.id){
            InfoService.editInfo(info.id,values)
                .then(res => {
                    close()
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else{
            InfoService.addInfo(values)
                .then(res => {
                    close()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const {values,touched, errors, handleBlur,handleChange, handleSubmit, handleReset} = useFormik({
        initialValues: {
            title: info.title ?? "",
            content: info.content ?? "",
            categories: info.categories ?? ""
        },
        validationSchema: infoSchema,
        onSubmit:onSubmit
    })

    return (
        <ModalStructure close={close}>
            <FormInfo onSubmit={handleSubmit}>
                <label htmlFor="title" > Titre de l'info</label>
                <input
                    value={values.title}
                    onChange={handleChange}
                    type="text" id="title" placeholder="Titre"
                    onBlur={handleBlur}
                    className={errors.title && touched.title ? "input-error" : ""}
                />
                {errors.title && touched.title && <p className={"error-message"}>{errors.title}</p>}
                <label htmlFor="content" id="content"> contenu de l'info </label>
                <input
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="textarea" id="content"
                    className={errors.content && touched.content ? "input-error" : ""}
                />
                {errors.content && touched.content && <p className={"error-message"}>{errors.content}</p>}

                <label htmlFor="categories" id="categories">
                    Choisissez une catégorie
                </label>
                <select
                    name="categories"
                    id="categories"
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBlur}
                    value={values.categories}
                >
                    <option>-- Sélectionnez une catégorie --</option>
                    {infoCategories?.map((ic) => (
                        <option key={ic.id} value={ic.id}>
                            {ic.title}
                        </option>
                    ))}
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
  
  input[type="text"], input[type="textarea"]{
    padding: 0.4rem;
  }
  
  .input-error{
    border:1px solid firebrick;
  }
  .error-message{
    color: firebrick;   
  }
`
