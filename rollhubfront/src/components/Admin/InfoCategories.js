import React, {useCallback, useEffect, useState} from 'react';
import {InfoCategoryService} from "../../services/info.category.service";
import {Table} from "./Users";
import styled from "styled-components";
import {InfoCategoryForm} from "../Forms/InfoCategoryForm";
import {useDispatch} from "react-redux";
import {PenTool, Trash} from "react-feather";

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
    const onCloseForm = useCallback(() => {
        setOpenForm(false)
        setInfoCat({})
    },[])
    const updateInfoCat = (i) => {
        setInfoCat(i)
        setOpenForm(true)
    }

    const deleteInfoCat = useCallback ((i) => {
        InfoCategoryService.deleteInfoCategory(i)
            .then(res => setResponseMessage(res.data))
            .catch(err => setResponseMessage(err.message))
    }, [])

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
                            <td> <ActionButtons onClick={() => {updateInfoCat(i)}}><PenTool color={"cornflowerblue"}/></ActionButtons>
                                /
                                <ActionButtons onClick={() => {deleteInfoCat(i.id)}}><Trash color={"firebrick"}/></ActionButtons> </td>
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
const ActionButtons = styled.button`
  border: none;
  padding: 0.5rem;
  border-radius: 15px;
  background: transparent;
  cursor: pointer;
`
export default InfoCategories;