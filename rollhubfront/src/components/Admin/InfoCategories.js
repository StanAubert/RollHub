import React, {useEffect, useState} from 'react';
import {InfoCategoryService} from "../../services/info.category.service";
import {Table} from "./Users";
import styled from "styled-components";
import {InfoCategoryForm} from "../Forms/InfoCategoryForms";
import {useDispatch} from "react-redux";

const InfoCategories = () => {
    const [infoCategories, setInfoCategories] = useState()
    const [error, setError] = useState();
    const [responseMessage, setResponseMessage] = useState()
    const [openForm, setOpenForm] = useState(false)
    const [infoCat, setInfoCat] = useState({})
    const dispatch = useDispatch();

    const onOpenForm = () => {
        setOpenForm(true)
    }
    const onCloseForm = () => {
        setOpenForm(false)
        setInfoCat({})
    }
    const updateInfoCat = (i) => {
        setInfoCat(i)
        setOpenForm(true)
    }

    const deleteInfoCat = (i) => {
        console.log(i)
        InfoCategoryService.deleteInfoCategory(i)
            .then(res => setResponseMessage(res.data))
            .catch(err => setResponseMessage(err.message))
    }

    useEffect(() => {
        InfoCategoryService.getAllInfoCategories()
            .then(res => {setInfoCategories(res.data)})
            .catch(err => {setError(err)})
    }, [onCloseForm, deleteInfoCat]);
    return (
        <div>
            {
                openForm &&
                <InfoCategoryForm close={onCloseForm} infocat={infoCat}/>
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
                            <td> <span onClick={() => {updateInfoCat(i)}}>Modifier</span> / <span onClick={() => {deleteInfoCat(i.id)}}>Supprimer</span> </td>
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