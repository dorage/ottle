import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectScreen } from '../../features/screen/screenSlice';

//#region styled-components
const Container = styled.div.attrs((props) => ({
    style: {
        width: props.w ? `${props.w}px` : '100vw',
        height: props.h ? `${props.h}px` : '100vh',
    },
}))`
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.pg || 'white'};
    z-index: ${(props) => props.zindex || '8000'};
    overflow: clip;

    touch-action: none;
`;
//#endregion

export const FullScreenContainer = ({ bg, ref, children, ...props }) => {
    const { w, h } = useSelector(selectScreen);

    return (
        <Container w={w} h={h} bg={bg} ref={ref} {...props}>
            {children}
        </Container>
    );
};
