import React from 'react';
import {Route, Routes} from "react-router-dom";
import {AdminLayout, Infos, Spots, Users} from "./index";
import AdminDashboard from "./AdminDashboard";
import NotFound from "../Base/NotFound";
import InfoCategories from "./InfoCategories";

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<AdminLayout/>}>
                <Route path="/" element={<AdminDashboard/> }/>
                <Route path="users" element={<Users/> }/>
                <Route path="infos" element={<Infos/> }/>
                <Route path="spots" element={<Spots/> }/>
                <Route path="infoCategories" element={<InfoCategories/> }/>

                <Route path={"*"} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AdminRouter;