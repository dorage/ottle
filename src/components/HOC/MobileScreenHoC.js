import React, { Component } from 'react';
import { FullScreenContainer } from '../Layout/Container';
import styled from 'styled-components';

export const Background = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.color.black_600};
`;

export const MobileScreenHoC = (Component) => (props) => {
    return (
        <Background>
            <FullScreenContainer>
                <Component {...props} />
            </FullScreenContainer>
        </Background>
    );
};
