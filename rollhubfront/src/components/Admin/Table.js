import React from 'react';
import styled from "styled-components";

const Table = ({children}) => {
    return (
        <TableContainer id={'custom-scroll'}>
            <TableItem>
                {children}
            </TableItem>
        </TableContainer>
    );
};

const TableContainer = styled.div`
  max-width: 90%;
  max-height: 400px;
  overflow-y : scroll;
  margin: 2rem auto auto auto;
`
export const TableItem = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 95%;
  margin: 0 auto auto auto;
  height:200px ;
  overflow: hidden;

  td,th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even){background-color: #f2f2f2;}

  tr:hover {background-color: #ddd;}

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: var(--color-green);
    color: white;
  }
`

export default Table;