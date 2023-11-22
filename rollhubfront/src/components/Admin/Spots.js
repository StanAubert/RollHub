import React, {useEffect, useState} from 'react';
import {PenTool, Trash} from "react-feather";
import {Table} from "./Users";
import styled from "styled-components";
import infos from "./Infos";
import {InfoForm} from "../Forms/InfoForm";
import {InfoService} from "../../services/Info.service";
import {SpotService} from "../../services/spot.service";
import LoaderDouble from "../LoaderDouble";

const Spots = () => {

    const [spots, setSpots] = useState([])
    const [error, setError] = useState("")
    const [responseMessage, setResponseMessage] = useState()
    const [openForm, setOpenForm] = useState(false)
    const [spot, setSpot] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const loadAllSpots = () => {
        SpotService.getAllSpots()
            .then(res => {
                setSpots(res.data)
                setIsLoading(false)
            })
            .catch(err => {setError(err.message)} )
    }
    const onOpenForm = () => {
        setOpenForm(true)
    }
    const onCloseForm = () => {
        setOpenForm(false)
        setSpot({})
    }
    const updateSpot = (i) => {
        setSpot(i)
        setOpenForm(true)
    }

    const deleteSpot = (i) => {
        SpotService.deleteSpot(i)
            .then(res => setResponseMessage(res.data))
            .catch(err => setResponseMessage(err.message))
        loadAllSpots();
    }

    useEffect(() => {
        loadAllSpots();
    }, []);
    return (
        <>
            {
                isLoading ?
                    <LoaderDouble/>
                    :
                    <div>
                        {
                            openForm
                        }
                        <Table>
                            <thead>
                            <tr>
                                <th> # </th>
                                <th>Nom</th>
                                <th>Coordonnées</th>
                                <th>Auteur</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {spots.map(s => {
                                return (
                                    <tr key={"row-" + s.id} >
                                        <td>{s.id}</td>
                                        <td>{s.name}</td>
                                        <td>{s.latitude}, {s.longitude}</td>
                                        <td>{s.author ?? "RollHub" }</td>
                                        <td>
                                            <ActionButtons onClick={() => {deleteSpot(s.id)}}><Trash color={"firebrick"}/></ActionButtons> </td>
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

export default Spots;