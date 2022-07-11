import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ModalPortal } from '../Portal';

//#region styled-components
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;

    overflow: hidden;
    z-index: 1000;
`;

const ExMo = styled.div`
    width: 200px;
    height: 200px;
    background-color: red;
`;
//#endregion

export const Modal = () => {
    return (
        <ModalPortal>
            {false && (
                <Container>
                    <ExMo>asdf</ExMo>
                </Container>
            )}
        </ModalPortal>
    );
};
