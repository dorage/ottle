import React from 'react';
import styled from 'styled-components';
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
    max-height: 10rem;

    background-image: url(${(props) => props.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;
//#endregion

export const LoadingAuth = () => {
    return (
        <Center>
            <Symbol src={OttleSymbol} />
        </Center>
    );
};
