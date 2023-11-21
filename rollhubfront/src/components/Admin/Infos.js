import React, {useEffect, useState} from 'react';
import {Table} from "./Users";
import {InfoService} from "../../services/Info.service";

const Infos = () => {
    const [infos, setInfos] = useState([])
    const [error, setError] = useState("")
    useEffect(() => {
        InfoService.getAllInfos()
            .then(res => {setInfos(res.data)})
            .catch(err => {setError(err.message)} )
    }, []);

    return (
        <div>
            <h1>Infos</h1>
            <Table>
                <thead>
                <tr>
                    <th> # </th>
                    <th>Titre</th>
                    <th>Contenu</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {infos.map(i => {
                    return (
                        <tr>
                            <td>{i.id}</td>
                            <td>{i.title}</td>
                            <td>{i.content}</td>
                            <td> Modifier / Supprimer </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default Infos;