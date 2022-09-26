import React, { useRef } from 'react';
import styled from 'styled-components';
import { FullScreenContainer } from '../Layout/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
    closeItemDrawer,
    selectItemDrawer,
} from '../../features/ottleMaker/itemDrawerSlice';
import { ItemDrawerHeader } from './Header';
import { goBackItemDrawerCategory } from '../../features/ottleMaker/itemDrawerCategorySlice';
import { ItemDrawerSearchBar } from './Search';
import { ItemDrawerBody } from './Body';
import { itemDrawerSearchGoBack } from '../../features/ottleMaker/itemDrawerSearchSlice';

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
//#endregion

export const OttleCreateItemDrawer = () => {
    const dispatch = useDispatch();
    const scrollRef = useRef();
    const { isOpend } = useSelector(selectItemDrawer);

    const onClickBack = () => {
        scrollRef.current.scrollTo(0, 0);
        dispatch(goBackItemDrawerCategory());
    };
    const onClickClose = () => {
        dispatch(closeItemDrawer());
    };
    const onClickSearchBack = () => {
        scrollRef.current.scrollTo(0, 0);
        dispatch(itemDrawerSearchGoBack());
    };

    return (
        <Container className={isOpend ? 'item-select-opend' : ''}>
            <ItemDrawerHeader
                onClickBack={onClickBack}
                onClickClose={onClickClose}
                onClickSearchBack={onClickSearchBack}
            />
            <ItemDrawerSearchBar />
            <ItemDrawerBody scrollRef={scrollRef} />
        </Container>
    );
};
