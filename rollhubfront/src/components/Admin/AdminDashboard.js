import React from 'react';
import styled from "styled-components";

const AdminDashboard = () => {
    return (
        <div>
            <h2>RollHub Admin</h2>
            <Table>
                <table>
                    <thead>
                    <tr>
                        <th>Utilisateurs</th>
                        <th>Infos</th>
                        <th>Spots</th>
                        <th>Playlists</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </Table>
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