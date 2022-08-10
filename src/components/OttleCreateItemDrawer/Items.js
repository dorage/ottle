import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectItemDrawerItems } from '../../features/ottleMaker/itemDrawerItemsSlice';
import { LoadingBlock } from './LoadingItem';
import { GridNoItems } from './NoItem';
import { HiOutlineCheck } from 'react-icons/hi';
import { Icon } from '../../components/Icon/icon';
import { theme } from '../../assets/styles/GlobalStyles';
import { selectItemDrawerCategory } from '../../features/ottleMaker/itemDrawerCategorySlice';
import { addItem } from '../../features/ottleMaker/ottleItemSlice';
import { selectItemDrawerSearch } from '../../features/ottleMaker/itemDrawerSearchSlice';

//#region styled-components
const Item = styled.div`
    overflow: hidden;

    & > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
const Thumb = styled.div`
    width: 100%;
    //max-width: 20rem;
    aspect-ratio: 1/1;
    margin: 0 auto;
    margin-bottom: ${(props) => props.theme.gap.gap_8};

    border-radius: ${(props) => props.theme.gap.gap_8};

    background-image: url(${(props) => props.src});
    background-size: contain;
    background-repeat: no-repeat;
`;
const Brand = styled.div`
    margin-bottom: ${(props) => props.theme.gap.gap_4};
    font-size: ${(props) => props.theme.font.p10};
    font-weight: 700;
`;
const Title = styled.div`
    font-size: ${(props) => props.theme.font.p14};
`;
const Added = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    color: ${(props) => props.theme.color.highlight};
    font-size: ${(props) => props.theme.font.p14};
`;
//#endregion

const ItemElement = ({ data, ...props }) => {
    const dispatch = useDispatch();
    const itemRef = useRef();
    const [active, setActive] = useState(false);
    const {
        brand,
        image: { original },
        name,
    } = data;

    const onClickItem = () => {
        if (active) return;
        setActive(true);
        dispatch(addItem(data));
        setTimeout(() => {
            setActive(false);
        }, 1000);
    };

    return (
        <Item ref={itemRef} onClick={onClickItem} {...props}>
            {active ? (
                <Added>
                    <Icon
                        w={48}
                        h={48}
                        color={theme.color.highlight}
                        icon={<HiOutlineCheck />}
                    />
                    <div>추가완료</div>
                </Added>
            ) : (
                <>
                    <Thumb src={original} />
                    <Brand>{brand}</Brand>
                    <Title>{name}</Title>
                </>
            )}
        </Item>
    );
};

export const ItemDrawerItems = () => {
    const { lastPage, loading: itemLoading, data, error } = useSelector(
        selectItemDrawerItems
    );
    const { loading: categoryLoading } = useSelector(selectItemDrawerCategory);

    if (!itemLoading && !categoryLoading && !data.length)
        return <GridNoItems />;

    return (
        <>
            {!categoryLoading &&
                data.map((e, idx) => <ItemElement key={idx} data={e} />)}
            {(itemLoading || categoryLoading) &&
                !lastPage &&
                Array(12)
                    .fill()
                    .map((_, idx) => <LoadingBlock key={idx} />)}
        </>
    );
};

export const ItemDrawerSearchItems = () => {
    const { lastPage, loading, items, error } = useSelector(
        selectItemDrawerSearch
    );

    if (!loading && !items.length) return <GridNoItems />;

    return (
        <>
            {items.map((e, idx) => (
                <ItemElement key={idx} data={e} />
            ))}
            {loading &&
                !lastPage &&
                Array(12)
                    .fill()
                    .map((_, idx) => <LoadingBlock key={idx} />)}
        </>
    );
};
