import React, {useEffect, useState} from 'react';
import {Table} from "./Users";
import {InfoService} from "../../services/Info.service";
import {InfoForm} from "../Forms/InfoForm";
import styled from "styled-components";
import {PenTool, Trash} from "react-feather";
import {InfoCategoryService} from "../../services/info.category.service";
import LoaderDouble from "../LoaderDouble";

const Infos = () => {
    const [infos, setInfos] = useState([])
    const [infoCategories, setInfoCategories] = useState({})
    const [error, setError] = useState("")
    const [responseMessage, setResponseMessage] = useState()
    const [openForm, setOpenForm] = useState(false)
    const [info, setInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const loadAllInfoAndCategories = () => {
        InfoService.getAllInfos()
            .then(res => {
                setInfos(res.data)
                setIsLoading(false)
            })
            .catch(err => {setError(err.message)} )

        InfoCategoryService.getAllInfoCategories()
            .then(res => {
                setInfoCategories(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const onOpenForm = () => {
        setOpenForm(true)
    }
    const onCloseForm = () => {
        setOpenForm(false)
        setInfo({})
        loadAllInfoAndCategories()
    }
    const updateInfo = (i) => {
        setInfo(i)
        setOpenForm(true)
    }

    const deleteInfo = (i) => {
        InfoService.deleteInfo(i)
            .then(res => {
                setResponseMessage(res.data)
                loadAllInfoAndCategories()
            })
            .catch(err => setResponseMessage(err.message))
    }

    useEffect(() => {
        loadAllInfoAndCategories();
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
                           <InfoForm close={onCloseForm} info={info} infoCategories={infoCategories}/>
                       }
                       <AddButton onClick={onOpenForm}> Ajouter une info</AddButton>

                       <Table>
                           <thead>
                           <tr>
                               <th> # </th>
                               <th>Titre</th>
                               <th>Contenu</th>
                               <th>Catégories</th>
                               <th>Actions</th>
                           </tr>
                           </thead>
                           <tbody>
                           {infos.map(i => {
                               return (
                                   <tr key={"row-" + i.id} >
                                       <td>{i.id}</td>
                                       <td>{i.title}</td>
                                       <td>{i.content}</td>
                                       <td>{i.categories.map((ic) => {
                                           return <p style={{color: ic.color}}>{ic.title}</p>
                                       })}</td>
                                       <td> <ActionButtons onClick={() => {updateInfo(i)}}><PenTool color={"cornflowerblue"}/></ActionButtons>
                                           /
                                           <ActionButtons onClick={() => {deleteInfo(i.id)}}><Trash color={"firebrick"}/></ActionButtons> </td>
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
  margin-top: 1rem;
`
const ActionButtons = styled.button`
  border: none;
  padding: 0.5rem;
  border-radius: 15px;
  background: transparent;
  cursor: pointer;
`


export default Infos;