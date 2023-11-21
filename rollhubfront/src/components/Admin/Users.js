import React, {useEffect, useState} from 'react';
import {UserService} from "../../services/user.service";
import styled from "styled-components";

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        UserService.getAllUsers()
            .then(res => {setUsers(res.data)})
            .catch(err => console.log(err.message) )
    }, []);
    return (
        <div>
            <h1>Utilisateurs</h1>
                <Table>
                    <thead>
                        <tr>
                            <th> # </th>
                            <th>Pseudo</th>
                            <th>Email</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Rôle</th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(u => {
                        return (
                            <tr key={"row-"+u.id}>
                                <td>{u.id}</td>
                                <td>{u.pseudo}</td>
                                <td>{u.email}</td>
                                <td>{u.firstName ?? "/"}</td>
                                <td>{u.lastName ?? "/"} </td>
                                <td>{u.roles.map( r => `${r} `)}</td>
                                <td> Modifier / Supprimer </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
        </div>
    );
};
export const Table = styled.table`
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 95%;
  margin: auto;

  td,th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even){background-color: #f2f2f2;}

  tr:hover {background-color: #ddd;}

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
  }
`


export default Users;