import React, { useEffect, useState } from 'react';
import { routes } from '../../configs/routes';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { generateItem } from '../../features/ottleMaker/ottleItemSlice';
import { useNavigate } from 'react-router-dom';
import { getOttleDocs } from '../../app/firestore';
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

export const ProfileItems = ({ uid }) => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { data, loading } = useSelector(selectMyOttles);

    useEffect(() => {
        dispatch(myOttlesAsyncAction(uid));
    }, []);

    const onClickOttle = (uid, ottleId) => () => {
        navigation(routes.ottleDetail(uid, ottleId));
    };

    return (
        <Container className='pad'>
            {loading ? (
                <></>
            ) : data ? (
                data.map(({ id, image }) => (
                    <Ottle
                        key={`${id}`}
                        src={image.sm}
                        onClick={onClickOttle(id)}
                    />
                ))
            ) : (
                <></>
            )}
        </Container>
    );
};
