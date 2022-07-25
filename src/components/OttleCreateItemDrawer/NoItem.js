import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region styled-components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
`;
//#endregion

export const GridNoItems = () => {
    return (
        <Container>
            <h2>아이템이 아직 없어요 :V</h2>
        </Container>
    );
};
