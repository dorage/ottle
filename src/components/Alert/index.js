import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectAlert } from '../../features/alert/alertSlice';
import { selectScreen } from '../../features/screen/screenSlice';
import { AlertPortal } from '../Portal';

const Container = styled.div.attrs((props) => ({
    style: {
        width: props.w ? `${props.w}px` : '100vw',
        height: props.h ? `${props.h}px` : '100vh',
    },
}))`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: ${(props) => props.theme.gap.gap_64} 0;

    overflow: hidden;
    z-index: ${(props) => props.theme.zindex.alert};
    pointer-events: none;
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
    const { w, h } = useSelector(selectScreen);
    const { alert, message } = useSelector(selectAlert);

    return (
        <AlertPortal>
            {alert && (
                <Container w={w} h={h}>
                    <Message>{message}</Message>
                </Container>
            )}
        </AlertPortal>
    );
};
