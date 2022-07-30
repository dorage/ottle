import React, { useEffect, useState } from 'react';
import { routes } from '../../configs/routes';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    myOttlesAsyncAction,
    selectMyOttles,
} from '../../features/profile/myOttlesSlice';

//#region styled-components
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${(props) => props.theme.gap.gap_4};
`;
const Ottle = styled.img`
    background-color: ${(props) => props.theme.color.black_600};
    aspect-ratio: 1/1;
    width: 100%;
`;
//#endregion

export const ProfileItems = ({ user, ottles }) => {
    const navigation = useNavigate();
    const { username } = user;

    const onClickOttle = (username, ottleId) => () => {
        navigation(routes.ottleDetail(username, ottleId));
    };

    return (
        <Container className='pad'>
            {ottles.map(({ id, image }, idx) => {
                return (
                    <Ottle
                        key={idx}
                        src={image.sm}
                        onClick={onClickOttle(username, id)}
                    />
                );
            })}
        </Container>
    );
};
