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
  flex-direction: column;
  a{
    width: 100%;
    text-decoration: none;
    font-size: calc(0.7rem + 1vw);
  }
  a:hover{
    color: white ;
    background-color: var(--color-green);
  }
  
  
  @media screen and (min-width: 700px){
    gap: 1.4rem;
    flex-direction: row;
    a{
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
      box-shadow: 1px 2px 16px 1px rgba(0,0,0,0.3);
    }
  }
  
  
`

export default AdminLayout;