import React from 'react';
import Nav from "../Nav";
import {Outlet} from "react-router-dom";

const BaseLayout = () => {
    return (
        <div>
            <Nav role="admin"/>
            <Outlet/>
        </div>
    );
};

export default BaseLayout;