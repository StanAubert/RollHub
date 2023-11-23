import React from 'react';
import {Route, Routes} from "react-router-dom";
import BaseLayout from "./BaseLayout";
import {Home} from "react-feather";
import NotFound from "./NotFound";
import HomePage from "../HomePage";

const BaseRouter = () => {
    return (
        <Routes>
            <Route element={<BaseLayout/>}>
                <Route index element={ <HomePage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default BaseRouter;