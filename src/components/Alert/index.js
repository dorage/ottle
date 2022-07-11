import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectAlert } from '../../features/alert/alertSlice';
import { AlertPortal } from '../Portal';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 6.6rem 0;

    overflow: hidden;
    z-index: 1001;
    //ointer-events: none;
`;

const Message = styled.div`
    padding-top: ${(props) => props.theme.gap.gap_8};
    padding-bottom: ${(props) => props.theme.gap.gap_8};
    padding-left: ${(props) => props.theme.gap.gap_32};
    padding-right: ${(props) => props.theme.gap.gap_32};
    margin: 0 ${(props) => props.theme.gap.gap_16};

    color: white;
    border-radius: ${(props) => props.theme.gap.gap_16};
    background-color: ${(props) => props.theme.color.black_300};
    font-size: ${(props) => props.theme.font.p14};
    font-weight: 500;
    text-align: center;
    opacity: 0.8;
`;

export const Alert = () => {
    const { alert, message } = useSelector(selectAlert);

    return (
        <AlertPortal>
            {alert && (
                <Container>
                    <Message>{message}</Message>
                </Container>
            )}
        </AlertPortal>
    );
};
