import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ItemDrawerCategoryGrid, ItemDrawerItemGrid } from './Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
    itemDrawerCategoryItemsPagingAsyncAction,
    itemDrawerRecommendItemsPagingAsyncAction,
    selectItemDrawerItems,
} from '../../features/ottleMaker/itemDrawerItemsSlice';
import { _ } from '../../utils/fp';
import { selectUser } from '../../features/user/userSlice';
import {
    itemDrawerMainCategoryAsyncAction,
    itemDrawerSubCategoryAsyncAction,
    selectItemDrawerCategory,
} from '../../features/ottleMaker/itemDrawerCategorySlice';
import {
    itemDrawerSearchAsyncAction,
    itemDrawerSearchCategoryAsyncAction,
    itemDrawerSearchPagingAsyncAction,
    selectItemDrawerSearch,
} from '../../features/ottleMaker/itemDrawerSearchSlice';
import { ItemDrawerCategories, ItemDrawerSearchCategory } from './Categories';
import { ItemDrawerItems, ItemDrawerSearchItems } from './Items';

//#region styled-components
const Container = styled.div`
    flex: 1;
    overflow: scroll;
`;
//#endregion

export const ItemDrawerBody = () => {
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const { user } = useSelector(selectUser);
    const { path } = useSelector(selectItemDrawerCategory);
    /** isSearching 에 따라서 ItemDrawerBody 나 ItemSearchBody로 변경 */
    const { isSearching, loading: searchLoading } = useSelector(
        selectItemDrawerSearch
    );

    // scroll Event를 등록하는 함수
    const setOnScrollEvent = (event) => {
        scrollRef.current.onscroll = event(scrollRef);
    };

    // 카테고리 버튼 클릭시 이벤트
    const onClickCategory = (category) => () => {
        const { scrollTop } = scrollRef.current;
        if (isSearching) {
            dispatch(
                itemDrawerSearchCategoryAsyncAction({
                    category,
                    scrollTop,
                })
            );
        } else {
            dispatch(
                itemDrawerSubCategoryAsyncAction({
                    category,
                    scrollTop,
                })
            );
        }

        scrollRef.current.scrollTo(0, 0);
    };

    const fetchRecommendItems = () => {
        dispatch(itemDrawerRecommendItemsPagingAsyncAction());
    };
    const fetchCategoryItems = () => {
        dispatch(itemDrawerCategoryItemsPagingAsyncAction());
    };
    const fetchSearchPagingItems = () => {
        dispatch(itemDrawerSearchPagingAsyncAction());
    };

    // 일정 거리 이상 넘겼을때 실행할 쓰로틀링되는 fetch 함수 생성
    const onOverThreshold = _.throttle((path) => {
        if (isSearching) {
            fetchSearchPagingItems();
            return;
        }
        if (!path.length) {
            fetchRecommendItems(user.uid);
            return;
        }
        fetchCategoryItems();
    }, 1000);

    useEffect(() => {
        dispatch(itemDrawerMainCategoryAsyncAction());
    }, []);

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
        setOnScrollEvent((scrollRef) => () => {
            if (
                scrollRef.current.scrollHeight -
                    (scrollRef.current.scrollTop +
                        scrollRef.current.clientHeight) <=
                10
            ) {
                onOverThreshold(path);
            }
        });
    }, [path, searchLoading]);

    return (
        <Container ref={scrollRef}>
            {isSearching ? (
                <>
                    <ItemDrawerCategoryGrid>
                        <ItemDrawerSearchCategory onClick={onClickCategory} />
                    </ItemDrawerCategoryGrid>
                    <ItemDrawerItemGrid>
                        <ItemDrawerSearchItems />
                    </ItemDrawerItemGrid>
                </>
            ) : (
                <>
                    <ItemDrawerCategoryGrid>
                        <ItemDrawerCategories onClick={onClickCategory} />
                    </ItemDrawerCategoryGrid>
                    <ItemDrawerItemGrid>
                        <ItemDrawerItems />
                    </ItemDrawerItemGrid>
                </>
            )}
        </Container>
    );
};
