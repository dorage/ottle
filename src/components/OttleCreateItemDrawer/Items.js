import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectOttleItemDrawer } from '../../features/ottleMaker/ottleItemDrawerSlice';

//#region styled-components
const Container = styled.div`
    flex: 1;
    width: 100%;
    padding-left: ${(props) => props.theme.gap.gap_16};
    padding-right: ${(props) => props.theme.gap.gap_16};
    padding-top: ${(props) => props.theme.gap.gap_8};
    padding-bottom: ${(props) => props.theme.gap.gap_16};

    background-color: white;
    overflow-y: scroll;
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${(props) => props.theme.gap.gap_8};
    grid-auto-rows: 20rem;
`;

const Added = styled.div`
    grid-column: ${(props) => (props.index % 3) + 1};
    grid-row: ${(props) => Math.floor(props.index / 3) + 1};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: ${(props) => props.theme.font.p14};
`;
const Item = styled.div.attrs((props) => {})`
    grid-column: ${(props) => (props.index % 3) + 1};
    grid-row: ${(props) => Math.floor(props.index / 3) + 1};
    overflow: hidden;

    & > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
const Thumb = styled.div`
    width: 100%;
    margin-bottom: ${(props) => props.theme.gap.gap_8};

    aspect-ratio: 1/1;
    border-radius: ${(props) => props.theme.gap.gap_8};
    background-image: url(${(props) => props.src});
    background-repeat: no-repeat;
`;
const Brand = styled.div`
    font-size: ${(props) => props.theme.font.p12};
    font-weight: 700;
`;
const Title = styled.div.attrs((props) => ({
    style: {
        marginBottom: props.theme.gap.gap_4,
        fontSize: props.theme.font.p14,
    },
}))``;
const Price = styled.div.attrs((props) => ({
    style: {
        fontSize: props.theme.font.p12,
    },
}))``;
//#endregion

export const OttleCreateItemDrawerItems = ({ data, onClickItem }) => {
    const scrollRef = useRef();
    const { isOpend } = useSelector(selectOttleItemDrawer);

    useEffect(() => {
        if (isOpend) scrollRef.current.focus();
    }, [isOpend]);

    return (
        <Container ref={scrollRef}>
            <Grid>
                {data.map((e, idx) => (
                    <Item
                        index={idx}
                        key={idx}
                        onClick={() => onClickItem(idx)}
                    >
                        <Thumb src={'https://picsum.photos/200'} />
                        <Brand>Adidas</Brand>
                        <Title>신비한팬츠 뿅뿅뿅뿅뿅뿅뿅뿅뿅</Title>
                        <Price>19000원</Price>
                    </Item>
                ))}
            </Grid>
        </Container>
    );
};

/*                
    <Added index={idx} key={idx}>
        <Icon w={48} h={48} icon={<HiCheckCircle />} />
        <div>추가완료!</div>
    </Added>
*/
