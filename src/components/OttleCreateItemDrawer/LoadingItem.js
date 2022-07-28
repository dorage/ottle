import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

//#region styled-components

const glow = keyframes`
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
`;
const Container = styled.div`
    width: ${(props) => props.w || props.width || '100%'};
    height: ${(props) => props.w || props.width || '100%'};
    background-color: ${(props) => props.theme.color.black_600};

    animation: ${glow} 1s ease-in-out infinite;
`;
//#endregion

export const LoadingBlock = ({ w, h, width, height }) => (
    <Container w={w} h={h} width={width} height={height} />
);
