import React, {useEffect, useState} from 'react';
import {InfoCategoryService} from "../../services/info.category.service";
import {Table} from "./Users";

const InfoCategories = () => {
    const [infoCategories, setInfoCategories] = useState()
    const [error, setError] = useState();

    useEffect(() => {
        InfoCategoryService.getAllInfoCategories()
            .then(res => {setInfoCategories(res.data)})
            .catch(err => {setError(err)})
    }, []);
    return (
        <div>
            <h1>Infos-Catégories</h1>
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

export default InfoCategories;