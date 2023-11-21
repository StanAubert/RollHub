import React from 'react';
import Nav from "../Nav";
import {Link, Outlet, useNavigate} from "react-router-dom";

const AdminLayout = () => {
    return (
        <div>
            <Nav/>
            <div>
                <Link to="users"> Utilisateurs</Link>
                <Link to="infos"> Infos</Link>
                <Link to="spots"> Spots</Link>
                <Link to="infoCategories"> Info-catégories</Link>
            </div>
            <Outlet/>
        </div>
    );
};

export default AdminLayout;