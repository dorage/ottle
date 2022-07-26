import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { OttleDetailHeader } from './Header';
import { FullScreenContainer } from '../../components/Layout/Container';
import { Ottle } from '../../components/Ottle';
import { selectUser } from '../../features/user/userSlice';

//#region styled-components
const Container = styled.div``;
//#endregion

export const OttleDetail = ({ data }) => {
    const { user } = useSelector(selectUser);

    return (
        <FullScreenContainer>
            <OttleDetailHeader />
            <Ottle />
        </FullScreenContainer>
    );
};
