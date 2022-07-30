import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FullScreenContainer } from '../Layout/Container';
import OttleSymbol from '../../assets/images/ottle_eng_black_512.png';

//#region styled-components
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const Symbol = styled.div`
    width: 30vw;
    height: 12vw;

    background-image: url(${(props) => props.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;
//#endregion

export const LoadingAuth = () => {
    return (
        <FullScreenContainer>
            <Center>
                <Symbol src={OttleSymbol} />
            </Center>
        </FullScreenContainer>
    );
};
