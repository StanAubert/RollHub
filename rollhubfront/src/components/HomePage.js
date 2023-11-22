import React from 'react';
import LoaderDouble from "./LoaderDouble";
import styled from "styled-components";

const HomePage = () => {

    return (
        <div>
            <h2>Bienvenue sur Rollhub</h2>

            <MapLeafLet id="map"></MapLeafLet>
        </div>
    )
}
const MapLeafLet = styled.div`
  height: 180px;
`
export default HomePage