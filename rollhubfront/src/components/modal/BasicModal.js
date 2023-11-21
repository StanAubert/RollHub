import React from 'react';
import styled from "styled-components";

const BasicModal = () => {
    return (
        <Blur>

        </Blur>
    );
};

export const Blur = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  filter: blur(px);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`
export default BasicModal;