import React from 'react';
import { routes } from '../../configs/routes';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { selectMyOttles } from '../../features/profile/myOttlesSlice';

//#region styled-components
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${(props) => props.theme.gap.gap_4};
`;
const OttleThumb = styled.div`
    width: 100%;
    aspect-ratio: 1/1;

    background-color: ${(props) => props.theme.color.black_600};
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-position: center;
`;
const LoadingThumb = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    background-color: ${(props) => props.theme.color.black_600};
`;
//#endregion

export const ProfileItems = ({ user }) => {
    const navigation = useNavigate();
    const { username } = user;
    const { lastPage, data: ottles, loading } = useSelector(selectMyOttles);

    const onClickOttle = (username, ottleId) => () => {
        navigation(routes.ottleDetail(username, ottleId));
    };

    return (
        <Container className='pad'>
            {ottles.map(({ id, image }, idx) => {
                return (
                    <OttleThumb
                        key={idx}
                        src={image.sm}
                        onClick={onClickOttle(username, id)}
                    />
                );
            })}
            {!lastPage && loading && (
                <>
                    <LoadingThumb />
                    <LoadingThumb />
                    <LoadingThumb />
                </>
            )}
        </Container>
    );
};
