import React from 'react';
import Nav from "../Nav";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";

const AdminLayout = () => {
    const location = useLocation();
    const isSelected = (path) => !!location.pathname.includes(path)
    return (
        <div>
            <Nav/>
            <SubNav>
                <Link to="users" className={isSelected("users") ? "selected" : "" }> Utilisateurs</Link>
                <Link to="infos" className={isSelected("infos") ? "selected" : "" }> Infos</Link>
                <Link to="spots" className={isSelected("spots") ? "selected" : "" }> Spots</Link>
                <Link to="infoCategories" className={isSelected("infoCategories") ? "selected" : "" }> Info-catégories</Link>
            </SubNav>
            <Outlet/>
        </div>
    );
};

const SubNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1.4rem;
  a{
    text-decoration: none;
    font-size: 1.6rem;
    transition: all 0.5s ease;
    border-top: 2px solid transparent;
    padding: 0 1rem 0.5rem 1rem;
    -webkit-border-bottom-right-radius: 10px;
    -webkit-border-bottom-left-radius: 10px;
    -moz-border-radius-bottomright: 10px;
    -moz-border-radius-bottomleft: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;

  }
  
  .selected{
    border-top: 2px solid var(--color-green);
    box-shadow: 1px 6px 20px -10px var(--color-green);
  }
`

export default AdminLayout;