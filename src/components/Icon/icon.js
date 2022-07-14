import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: none;
    background-color: transparent;

    & > svg {
        width: ${(props) => `${props.w ? props.w / 10 : 2.8}rem`};
        height: ${(props) => `${props.h ? props.h / 10 : 2.8}rem`};
        color: ${(props) => props.color || props.theme.color.black_200};
    }
`;

export const Icon = ({ icon, ...props }) => (
    <Container {...props}>{icon}</Container>
);
