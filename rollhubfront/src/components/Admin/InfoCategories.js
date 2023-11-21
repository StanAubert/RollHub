import React, {useEffect, useState} from 'react';
import {InfoCategoryService} from "../../services/info.category.service";
import {Table} from "./Users";
import styled from "styled-components";
import {InfoCategoryForm} from "../Forms/InfoCategoryForms";

const InfoCategories = () => {
    const [infoCategories, setInfoCategories] = useState()
    const [error, setError] = useState();
    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {
        InfoCategoryService.getAllInfoCategories()
            .then(res => {setInfoCategories(res.data)})
            .catch(err => {setError(err)})
    }, []);

    const onOpenForm = () => {
        setOpenForm(true)
    }

    const onCloseForm = () => {
        setOpenForm(false)
    }
    return (
        <div>
            {
                openForm &&
                <InfoCategoryForm close={onCloseForm}/>
            }
            <h1>Infos-Catégories</h1>
            <AddButton onClick={onOpenForm}> Ajouter une catégorie</AddButton>
            <Table>
                <thead>
                <tr>
                    <th> # </th>
                    <th>Titre</th>
                    <th>Couleur</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {infoCategories?.map(i => {
                    return (
                        <tr key={"row-" + i.id}>
                            <td>{i.id}</td>
                            <td>{i.title}</td>
                            <td style={{background:i.color}}></td>
                            <td> Modifier / Supprimer </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
};
const AddButton = styled.button`
  border: none;
  background: seagreen;
  color: white;
  padding: 1rem;
  cursor: pointer;
`
export default InfoCategories;