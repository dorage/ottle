import React from 'react';
import { FullScreenContainer } from '../Layout/Container';
import styled from 'styled-components';

const Background = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.color.black_600};
`;

const Container = styled(FullScreenContainer)`
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;

export const MobileScreenHoC = (Component) => (props) => {
    return (
        <Background>
            <Container>
                <Component {...props} />
            </Container>
        </Background>
    );
};
