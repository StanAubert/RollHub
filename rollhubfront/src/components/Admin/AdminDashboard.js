import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div>
            <h2>RollHub Admin</h2>
            <div>
                <Link to="users"> Utilisateurs</Link>
                <Link to="infos"> Infos</Link>
                <Link to="spots"> Spots</Link>
            </div>
        </div>
    );
};

const Table = styled.div`
  padding: 2rem;
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`
export default AdminDashboard;