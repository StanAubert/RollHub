import React, {useCallback, useEffect, useState} from 'react';
import {InfoCategoryService} from "../../services/info.category.service";
import styled from "styled-components";
import {InfoCategoryForm} from "../Forms/InfoCategoryForm";
import {useDispatch} from "react-redux";
import {PenTool, Trash} from "react-feather";
import LoaderDouble from "../LoaderDouble";
import Table from "./Table";

const InfoCategories = () => {
    const [infoCategories, setInfoCategories] = useState()
    const [error, setError] = useState();
    const [responseMessage, setResponseMessage] = useState()
    const [openForm, setOpenForm] = useState(false)
    const [infoCat, setInfoCat] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

    const loadAllInfoCat = () => {
        InfoCategoryService.getAllInfoCategories()
            .then(res => {
                setInfoCategories(res.data)
                setIsLoading(false)
            })
            .catch(err => {setError(err)})
    }
    const onOpenForm = () => {
        setOpenForm(true)
    }
    const onCloseForm = () => {
        setOpenForm(false)
        setInfoCat({})
        loadAllInfoCat();
    }
    const updateInfoCat = (i) => {
        setInfoCat(i)
        setOpenForm(true)
    }

    const deleteInfoCat = (i) => {
        InfoCategoryService.deleteInfoCategory(i)
            .then(res => {

                loadAllInfoCat();
            })
            .catch(err => setResponseMessage(err.message))
    }

    useEffect(() => {
        loadAllInfoCat();
    }, []);
    return (
        <>
            {
                isLoading ?
                    <LoaderDouble/>
                    :
                    <div>
                        {
                            openForm &&
                            <InfoCategoryForm close={onCloseForm} infocat={infoCat}/>
                        }
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
            }
        </>
    );
};
const AddButton = styled.button`
  border: none;
  background-color: var(--color-green);
  color: white;
  padding: 1rem;
  cursor: pointer;
  box-shadow: 2px 3px 6px 1px rgba(0,0,0,0.4);
  margin: 1rem 0;
`
const ActionButtons = styled.button`
  border: none;
  padding: 0.5rem;
  border-radius: 15px;
  background: transparent;
  cursor: pointer;
`
export default InfoCategories;