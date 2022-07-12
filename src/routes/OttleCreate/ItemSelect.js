import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from '../../components/Button/IconButton';
import { HiX, HiChevronLeft } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
    closeItemDrawer,
    selectOttleItemDrawer,
} from '../../features/ottleMaker/ottleItemDrawer';

//#region styled-components
const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 100vw;
    padding-top: ${(props) => props.theme.gap.gap_16};

    border-top: 1px solid ${(props) => props.theme.color.black_600};
    background-color: white;
    z-index: 99;

    transform: translateY(100vh);
    transition: 0.5s;
    &.item-select-opend {
        transform: translateY(0);
    }
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.gap.gap_4};
`;
const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: ${(props) => props.theme.gap.gap_4};
`;
const SearchBar = styled.input.attrs((props) => {})`
    width: 100%;
    padding: 0 ${(props) => props.theme.gap.gap_8};
    margin: 0 ${(props) => props.theme.gap.gap_16};

    border: none;
    border-bottom: 1px solid ${(props) => props.theme.color.black_300};
    font-size: ${(props) => props.theme.font.p14};
`;
const ItemContainer = styled.div`
    display: grid;
    grid-template-columns: (3, 1fr);
    grid-gap: ${(props) => props.theme.gap.gap_8};
    grid-auto-rows: 200px;
    flex: 1;
    padding-left: ${(props) => props.theme.gap.gap_16};
    padding-right: ${(props) => props.theme.gap.gap_16};
    padding-top: ${(props) => props.theme.gap.gap_8};
    padding-bottom: ${(props) => props.theme.gap.gap_16};

    background-color: white;
    overflow: scroll;
`;
const Item = styled.div.attrs((props) => {})`
    grid-column: ${(props) => (props.index % 3) + 1};
    grid-row: ${(props) => Math.floor(props.index / 3) + 1};
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
}))`
    text-overflow: ellipsis;
`;
const Price = styled.div.attrs((props) => ({
    style: {
        'font-size': props.theme.font.p12,
    },
}))``;
//#endregion

export const ItemSelect = ({ closeItemSelect }) => {
    const dispatch = useDispatch();
    const { isOpend } = useSelector(selectOttleItemDrawer);

    return (
        <Container className={isOpend ? 'item-select-opend' : ''}>
            <Header>
                <IconButton icon={<HiChevronLeft />} />
                <IconButton
                    icon={<HiX />}
                    onClick={() => {
                        dispatch(closeItemDrawer());
                    }}
                />
            </Header>
            <SearchBarContainer>
                <SearchBar placeholder='search brand, product' />
            </SearchBarContainer>
            <ItemContainer>
                {Array(20)
                    .fill(0)
                    .map((e, idx) => (
                        <Item index={idx} key={idx}>
                            <Thumb src={'https://picsum.photos/200'} />
                            <Brand>Adidas</Brand>
                            <Title>신비한팬츠</Title>
                            <Price>19000원</Price>
                        </Item>
                    ))}
            </ItemContainer>
        </Container>
    );
};
