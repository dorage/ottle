import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GroupItem } from './GroupItem';

//#region styled-components
const Container = styled.div``;
const Groups = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: ${(props) => props.theme.gap.gap_8};
    grid-row-gap: ${(props) => props.theme.gap.gap_16};
`;
const ViewMore = styled.div``;
//#endregion

export const GroupsMyGroups = () => {
    const groups = [
        {
            ottleCount: 0,
            saveCount: 24124,
            imgSrc: 'https://picsum.photos/500',
        },
        {
            ottleCount: 1,
            saveCount: 22414,
            imgSrc: 'https://picsum.photos/500',
        },
        { ottleCount: 2, saveCount: 2244, imgSrc: 'https://picsum.photos/500' },
        { ottleCount: 3, saveCount: 224, imgSrc: 'https://picsum.photos/500' },
    ];
    return (
        <Container>
            <Groups>
                {groups.map((group) => (
                    <GroupItem group={group} />
                ))}
            </Groups>
            <ViewMore />
        </Container>
    );
};
