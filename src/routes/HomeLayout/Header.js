import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HeaderContainer } from '../../components/Layout/Header';
import ottle_black_512 from '../../assets/images/ottle_black_512.png';
import { routes } from '../../configs/routes';
import { LinkedGradientButton } from '../../components/Button/GradientButton';
import { selectUser } from '../../features/user/userSlice';

const Logo = styled.img`
    height: 3.2rem;
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
