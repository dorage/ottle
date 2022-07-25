import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FullScreenContainer } from '../Layout/Container';
import { IconButton } from '../Button/IconButton';
import { HiX, HiChevronLeft, HiCheckCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
    closeItemDrawer,
    selectItemDrawer,
} from '../../features/ottleMaker/itemDrawerSlice';
import { addItem } from '../../features/ottleMaker/ottleItemSlice';
import { Icon } from '../Icon/icon';
import { ItemDrawerHeader } from './Header';
import { InputField } from '../Input/InputField';
import {
    goBackItemDrawerCategory,
    itemDrawerMainCategoryAsyncAction,
    selectItemDrawerCategory,
} from '../../features/ottleMaker/itemDrawerCategorySlice';
import { ItemDrawerItemGrid, ItemDrawerCategoryGrid } from './Grid';
import { GridCategories } from './Categories';

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
//#endregion

export const OttleCreateItemDrawer = ({ closeItemSelect }) => {
    const dispatch = useDispatch();
    const { isOpend } = useSelector(selectItemDrawer);

    useEffect(() => {
        dispatch(itemDrawerMainCategoryAsyncAction());
    }, []);

    const onClickBack = () => {
        dispatch(goBackItemDrawerCategory());
    };
    const onClickClose = () => {
        dispatch(closeItemDrawer());
    };

    return (
        <Container className={isOpend ? 'item-select-opend' : ''}>
            <ItemDrawerHeader
                onClickBack={onClickBack}
                onClickClose={onClickClose}
            />
            <SearchBarContainer>
                <InputField placeholder='search brand, product' />
            </SearchBarContainer>
            <ItemDrawerCategoryGrid />
            <ItemDrawerItemGrid />
        </Container>
    );
};
