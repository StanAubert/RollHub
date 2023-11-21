import React from 'react';
import {Blur} from "./BasicModal";
import styled from "styled-components";
import {XCircle} from "react-feather";

const ModalStructure = ({children, close}) => {
    return (
        <Blur>
            <Modal>
                <XCircle color="red" onClick={close} style={{alignSelf: "self-end"}}/>
                {children}
            </Modal>
        </Blur>
    );
};
const Modal = styled.div`
  padding: 0.6rem;
  width: 60%;
  max-height: 80%;
  min-height: 40%;
  margin: auto;
  background: white;
  box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
`
export default ModalStructure;