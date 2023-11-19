import React from 'react';
import styled from "styled-components";

const BasicModal = () => {
    return (
        <Blur>

        </Blur>
    );
};

const Blur = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  filter: blur(px);
  height: 100%;
  width: 100%;
`
export default BasicModal;