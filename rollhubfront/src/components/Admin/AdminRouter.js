import React from 'react';
import {Route, Routes} from "react-router-dom";
import {AdminLayout, Users} from "./index";
import AdminDashboard from "./AdminDashboard";

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<AdminLayout/>}>
                <Route path="/" element={<AdminDashboard/> }/>
                <Route path="users" element={<Users/> }/>
            </Route>
        </Routes>
    );
};

export default AdminRouter;