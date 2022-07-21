import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OttleDetailHeader } from './Header';
import { FullScreenContainer } from '../../components/Layout/Container';

//#region styled-components
const Container = styled.div``;
//#endregion

export const OttleDetail = () => {
    return (
        <FullScreenContainer>
            <OttleDetailHeader />
        </FullScreenContainer>
    );
};
