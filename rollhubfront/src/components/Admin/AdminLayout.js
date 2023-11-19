import React from 'react';
import Nav from "../Nav";
import {Outlet, useNavigate} from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Nav role="admin"/>
            <Outlet/>
        </div>
    );
};

export default AdminLayout;