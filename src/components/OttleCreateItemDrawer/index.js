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
    const { scrollTop } = useSelector(selectItemDrawerItems);

    const onClickBack = () => {
        dispatch(goBackItemDrawerCategory());
    };
    const onClickClose = () => {
        dispatch(closeItemDrawer());
    };
    // scroll Event를 등록하는 함수
    const setOnScrollEvent = (event) => {
        scrollRef.current.onscroll = event(scrollRef);
    };
    const fetchRecommendItems = () => {
        dispatch(itemDrawerRecommendItemsAsyncAction());
    };
    const fetchCategoryItems = (categoryId) => {
        dispatch(itemDrawerCategoryItemsPagingAsyncAction({ categoryId }));
    };
    // 일정 거리 이상 넘겼을때 실행할 쓰로틀링되는 fetch 함수 생성
    const onOverThreshold = _.throttle((path) => {
        if (!path.length) {
            fetchRecommendItems();
            return;
        }
        fetchCategoryItems(_.getLastIndex(path));
    }, 1000);

    useEffect(() => {
        setOnScrollEvent((scrollRef) => () => {
            console.log(
                scrollRef.current.scrollHeight -
                    (scrollRef.current.scrollTop +
                        scrollRef.current.clientHeight)
            );
            if (
                scrollRef.current.scrollHeight -
                    (scrollRef.current.scrollTop +
                        scrollRef.current.clientHeight) <=
                10
            ) {
                onOverThreshold(path);
            }
        });
    }, [path]);
    useEffect(() => {
        scrollRef.current.scrollTo(0, scrollTop);
    }, [scrollTop]);

    return (
        <Container className={isOpend ? 'item-select-opend' : ''}>
            <ItemDrawerHeader
                onClickBack={onClickBack}
                onClickClose={onClickClose}
            />
            {/*
            <SearchBarContainer>
                <InputField placeholder='search brand, product' />
            </SearchBarContainer>
            */}
            <ItemDrawerCategoryGrid scrollRef={scrollRef} />
            <ScrollContainer ref={scrollRef}>
                <ItemDrawerItemGrid />
            </ScrollContainer>
        </Container>
    );
};
