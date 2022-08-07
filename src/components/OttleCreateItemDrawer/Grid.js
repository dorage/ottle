import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GridCategories } from './Categories';
import { GridItems } from './Items';

//#region styled-components
const Container = styled.div`
    width: 100%;
    padding-left: ${(props) => props.theme.gap.gap_16};
    padding-right: ${(props) => props.theme.gap.gap_16};
    padding-top: ${(props) => props.theme.gap.gap_8};
    padding-bottom: ${(props) => props.theme.gap.gap_16};

    background-color: white;
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${(props) => props.theme.gap.gap_8};
    grid-auto-rows: 20rem;
`;
const ItemGrid = styled(Grid)`
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: calc((100vw - 3.2rem) / 3 + 4rem);
`;
const CategoryGrid = styled(Grid)`
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 3rem;
`;
//#endregion

export const ItemDrawerItemGrid = () => {
    return (
        <Container>
            <ItemGrid>
                <GridItems />
            </ItemGrid>
        </Container>
    );
};

export const ItemDrawerCategoryGrid = ({ scrollRef }) => {
    return (
        <Container>
            <CategoryGrid h={5}>
                <GridCategories scrollRef={scrollRef} />
            </CategoryGrid>
        </Container>
    );
};

/*                
    <Added index={idx} key={idx}>
        <Icon w={48} h={48} icon={<HiCheckCircle />} />
        <div>추가완료!</div>
    </Added>
*/
