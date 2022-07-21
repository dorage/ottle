import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FullScreenContainer } from '../Layout/Container';
import { IconButton } from '../Button/IconButton';
import { HiX, HiChevronLeft, HiCheckCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
    closeItemDrawer,
    selectOttleItemDrawer,
} from '../../features/ottleMaker/ottleItemDrawerSlice';
import { addItem } from '../../features/ottleMaker/ottleItemSlice';
import { Icon } from '../Icon/icon';
import { OttleCreateItemDrawerHeader } from './Header';
import { InputField } from '../Input/InputField';
import { OttleCreateItemDrawerItems } from './Items';

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
    const { isOpend, category, data } = useSelector(selectOttleItemDrawer);

    const onClickItem = (idx) => {
        dispatch(addItem(data[idx]));
    };

    return (
        <Container className={isOpend ? 'item-select-opend' : ''}>
            <OttleCreateItemDrawerHeader
                onClickBack={() => {}}
                onClickClose={() => {
                    dispatch(closeItemDrawer());
                }}
            />
            <SearchBarContainer>
                <InputField placeholder='search brand, product' />
            </SearchBarContainer>
            <OttleCreateItemDrawerItems data={data} onClickItem={onClickItem} />
        </Container>
    );
};
