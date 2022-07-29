import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HeaderContainer } from '../Layout/Header';
import { IconButton } from '../Button/IconButton';
import { HiChevronLeft, HiX } from 'react-icons/hi';
import { selectItemDrawerCategory } from '../../features/ottleMaker/itemDrawerCategorySlice';

//#region styled-components
//#endregion

export const ItemDrawerHeader = ({ onClickBack, onClickClose }) => {
    const { history } = useSelector(selectItemDrawerCategory);
    return (
        <HeaderContainer>
            {history.length ? (
                <IconButton icon={<HiChevronLeft />} onClick={onClickBack} />
            ) : (
                <IconButton />
            )}
            <IconButton icon={<HiX />} onClick={onClickClose} />
        </HeaderContainer>
    );
};
