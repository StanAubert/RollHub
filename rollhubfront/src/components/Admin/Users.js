import React, {useEffect, useState} from 'react';
import {UserService} from "../../services/user.service";
import styled from "styled-components";
import {PenTool, Trash} from "react-feather";
import {InfoService} from "../../services/Info.service";
import {UserForm} from "../Forms/userForm";

const Users = () => {
    const [users, setUsers] = useState([])
    const [infoCategories, setInfoCategories] = useState({})
    const [error, setError] = useState("")
    const [responseMessage, setResponseMessage] = useState()
    const [openForm, setOpenForm] = useState(false)
    const [user, setUser] = useState({})

    const onOpenForm = () => {
        setOpenForm(true)
    }
    const onCloseForm = () => {
        setOpenForm(false)
        setUser({})
    }
    const updateUser = (i) => {
        setUser(i)
        setOpenForm(true)
    }

    const deleteUser = (i) => {
        UserService.deleteUser(i)
            .then(res => setResponseMessage(res.data))
            .catch(err => setResponseMessage(err.message))
    }

    useEffect(() => {
        UserService.getAllUsers()
            .then(res => {setUsers(res.data)})
            .catch(err => console.log(err.message) )
    }, []);
    return (
        <div>
            {
                openForm &&
                <UserForm user={user} close={onCloseForm}/>
            }
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
                                <td>{u.roles.includes("ROLE_ADMIN") ? "Adminisatrateur" : "Utilisateur"}</td>
                                <td> <ActionButtons onClick={() => {updateUser(u)}}><PenTool color={"cornflowerblue"}/></ActionButtons>
                                    /
                                    <ActionButtons onClick={() => {deleteUser(u.id)}}><Trash color={"firebrick"}/></ActionButtons> </td>
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


export default Users;