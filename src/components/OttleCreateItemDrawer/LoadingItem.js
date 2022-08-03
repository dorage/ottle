import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { findByAltText } from '@testing-library/react';

//#region styled-components

const glow = keyframes`
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
`;
const Flex = styled.div`
    font-size: ${(props) => props.fontSize || props.theme.font.p14};
    background-color: ${(props) => props.theme.color.black_600};

    animation: ${glow} 1s ease-in-out infinite;
`;
const Container = styled(Flex)`
    width: ${(props) => props.w || props.width || '100%'};
    height: ${(props) => props.w || props.width || '100%'};
`;
//#endregion

export const LoadingBlock = ({ length = 0, fontSize }) => (
    <Container fontSize={fontSize}>
        {Array(length)
            .fill('ㅤ')
            .join('')}
    </Container>
);

export const LoadingFlex = ({ length = 0, fontSize }) => (
    <Flex fontSize={fontSize}>
        {Array(length)
            .fill('ㅤ')
            .join('')}
    </Flex>
);
