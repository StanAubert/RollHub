import React, {useEffect, useState} from 'react';
import {UserService} from "../../services/user.service";

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        UserService.getAllUsers()
            .then(res => {setUsers(res.data)})
            .catch(err => console.log(err.message) )
    }, [users]);
    return (
        <div>
            <h1>Utilisateurs</h1>
            {
                users.map( u => {
                    return <p> {u.pseudo} </p>
                })
            }
        </div>
    );
};

export default Users;