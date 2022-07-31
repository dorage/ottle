import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FullScreenContainer } from '../Layout/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
    closeItemDrawer,
    selectItemDrawer,
} from '../../features/ottleMaker/itemDrawerSlice';
import { ItemDrawerHeader } from './Header';
import { InputField } from '../Input/InputField';
import {
    goBackItemDrawerCategory,
    selectItemDrawerCategory,
} from '../../features/ottleMaker/itemDrawerCategorySlice';
import { ItemDrawerItemGrid, ItemDrawerCategoryGrid } from './Grid';
import {
    itemDrawerCategoryItemsAsyncAction,
    itemDrawerCategoryItemsPagingAsyncAction,
    itemDrawerRecommendItemsAsyncAction,
    selectItemDrawerItems,
} from '../../features/ottleMaker/itemDrawerItemsSlice';
import { _ } from '../../utils/fp';

//#region styled-components
const Container = styled(FullScreenContainer)`
    background-color: white;
    z-index: ${(props) => props.theme.zindex.ottleCreate.itemDrawer};

    transform: translateY(100vh);
    transition: 0.5s;
    &.item-select-opend {
        transform: translateY(0);
    }
`;
const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: ${(props) => props.theme.gap.gap_4};
`;
const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
`;
//#endregion

let eventListener;

export const OttleCreateItemDrawer = () => {
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const { isOpend } = useSelector(selectItemDrawer);
    const { path } = useSelector(selectItemDrawerCategory);
    const { lastPage } = useSelector(selectItemDrawerItems);

    const onClickBack = () => {
        dispatch(goBackItemDrawerCategory());
    };
    const onClickClose = () => {
        dispatch(closeItemDrawer());
    };

    const setOnScrollEvent = (event) => {
        if (eventListener) scrollRef.current.removeEventListener(eventListener);
        eventListener = scrollRef.current.addEventListener(
            'scroll',
            event(scrollRef)
        );
    };
    const removeOnScrollEvent = (event) => {
        if (eventListener) scrollRef.current.removeEventListener(eventListener);
    };

    const fetchRecommendItems = () => {
        dispatch(itemDrawerRecommendItemsAsyncAction());
    };
    const fetchCategoryItems = (categoryId) => {
        dispatch(itemDrawerCategoryItemsPagingAsyncAction(categoryId));
    };

    useEffect(() => {
        setOnScrollEvent((scrollRef) => () => {
            if (lastPage) return;
            if (
                scrollRef.current.scrollHeight -
                    (scrollRef.current.scrollTop +
                        scrollRef.current.clientHeight) ===
                0
            ) {
                if (!path.length) {
                    fetchRecommendItems();
                    return;
                }
                fetchRecommendItems(_.getLastIndex(path));
            }
        });
    }, []);

    return (
        <Container className={isOpend ? 'item-select-opend' : ''}>
            <ItemDrawerHeader
                onClickBack={onClickBack}
                onClickClose={onClickClose}
            />
            <SearchBarContainer>
                <InputField placeholder='search brand, product' />
            </SearchBarContainer>
            <ScrollContainer ref={scrollRef}>
                <ItemDrawerCategoryGrid />
                <ItemDrawerItemGrid />
            </ScrollContainer>
        </Container>
    );
};
