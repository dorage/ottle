import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HeaderContainer } from '../Layout/Header';
import { IconButton } from '../Button/IconButton';
import { HiChevronLeft, HiX } from 'react-icons/hi';

//#region styled-components
const Container = styled.div``;
//#endregion

export const OttleCreateItemDrawerHeader = ({ onClickBack, onClickClose }) => {
    return (
        <HeaderContainer>
            <IconButton icon={<HiChevronLeft />} onClick={onClickBack} />
            <IconButton icon={<HiX />} onClick={onClickClose} />
        </HeaderContainer>
    );
};
