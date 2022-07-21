import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { HeaderContainer } from '../../components/Layout/Header';
import ottle_black_512 from '../../assets/images/ottle_black_512.png';
import { routes } from '../../configs/routes';
import { LinkedGradientButton } from '../../components/Button/GradientButton';

const Logo = styled.img`
    height: 3.2rem;
`;

export const HomeLayoutHeader = () => {
    return (
        <HeaderContainer>
            <Logo src={ottle_black_512} />
            <LinkedGradientButton to={routes.ottleCreate}>
                Create
            </LinkedGradientButton>
        </HeaderContainer>
    );
};
