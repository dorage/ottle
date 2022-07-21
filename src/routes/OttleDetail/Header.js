import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HeaderContainer } from '../../components/Layout/Header';
import { IconButton } from '../../components/Button/IconButton';

//#region styled-components
const Container = styled.div``;
//#endregion

export const OttleDetailHeader = () => {
    return (
        <HeaderContainer>
            <IconButton />
        </HeaderContainer>
    );
};
