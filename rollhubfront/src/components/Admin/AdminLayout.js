import React from 'react';
import Nav from "../Nav";
import {Outlet, useNavigate} from "react-router-dom";

const AdminLayout = () => {
    return (
        <div>
            <Nav/>
            <Outlet/>
        </div>
    );
};

export default AdminLayout;