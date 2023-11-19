import React from 'react';
import Nav from "../Nav";
import {Outlet} from "react-router-dom";

const AdminLayout = () => {
    return (
        <div>
            <Nav role="admin"/>
            <Outlet/>
        </div>
    );
};

export default AdminLayout;