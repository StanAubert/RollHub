import React from 'react';
import {useFormik} from "formik";
import ModalStructure from "../modal/ModalStructure";
import styled from "styled-components";
import {spotSchema} from "./Schemas";
import {useNavigate} from "react-router-dom";
import {InfoService} from "../../services/Info.service";


export  const SpotForm = ({close, Spot}) => {

    const navigate = useNavigate();
    const onSubmit = () => {

        console.log(values)
        if(Spot.id){
            InfoService.editInfo(Spot.id,values)
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
            title: Spot.title ?? "",
            content: Spot.content ?? ""
        },
        validationSchema: spotSchema,
        onSubmit:onSubmit
    })
    return (
        <ModalStructure close={close}>
            <FormInfo onSubmit={handleSubmit}>
                <label htmlFor="title" > Titre de l'Spot</label>
                <input
                    value={values.title}
                    onChange={handleChange}
                    type="text" id="title" placeholder="Titre"
                    onBlur={handleBlur}
                    className={errors.title && touched.title ? "input-error" : ""}
                />
                {errors.title && touched.title && <p className={"error-message"}>{errors.title}</p>}
                <label htmlFor="content" id="content"> contenu de l'Spot </label>
                <input
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="textarea" id="content"
                    className={errors.content && touched.content ? "input-error" : ""}
                />
                {errors.content && touched.content && <p className={"error-message"}>{errors.content}</p>}
                <button type="submit" onClick={handleSubmit} > Ajouter </button>
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
