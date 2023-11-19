import React from 'react';
import BasicModal from "./BasicModal";
import styled from "styled-components";

const LogoutModal = (close, logout) => {

    const closeModal = () => {
        close()
    }

    const logoutCall = () =>{
        logout()
    }
    return (
        <BasicModal>
            <Modal>
                <h2> Souhaitez-vous vous déconnecter ? </h2>

                <button onClick={closeModal}>Oui</button>
                <button onClick={logoutCall }>Non</button>
            </Modal>
        </BasicModal>
    );
};
const Modal = styled.div`
  background-color: #F5F5F5;
  border-radius: 15px;
  max-width: 80%;
  max-height: 80%;
  margin: auto;
`
export default LogoutModal;