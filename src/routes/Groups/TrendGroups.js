import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GroupItem } from './GroupItem';

//#region styled-components
const Container = styled.div``;
const Groups = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${(props) => props.theme.gap.gap_8};
    grid-row-gap: ${(props) => props.theme.gap.gap_8};
`;
//#endregion

export const TrendGroups = () => {
    return (
        <Container>
            <Groups></Groups>
        </Container>
    );
};
