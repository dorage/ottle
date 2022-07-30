import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HeaderContainer } from '../../components/Layout/Header';
import ottle_black_512 from '../../assets/images/ottle_eng_black_512.png';
import { routes } from '../../configs/routes';
import { LinkedGradientButton } from '../../components/Button/GradientButton';
import { selectUser } from '../../features/user/userSlice';

const Logo = styled.div`
    width: 7rem;
    height: 3.2rem;

    background-image: url(${(props) => props.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;

export const HomeLayoutHeader = () => {
    const { isAuth, user } = useSelector(selectUser);
    return (
        <HeaderContainer>
            <Logo src={ottle_black_512} />
            <LinkedGradientButton
                to={isAuth && routes.ottleCreate(user.username, '123')}
            >
                Create
            </LinkedGradientButton>
        </HeaderContainer>
    );
};
