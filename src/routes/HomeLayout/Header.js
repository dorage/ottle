import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HeaderContainer } from '../../components/Layout/Header';
import ottle_black_512 from '../../assets/images/ottle_eng_black_512.png';
import { routes } from '../../configs/routes';
import { LinkedGradientButton } from '../../components/Button/GradientButton';
import { selectUser } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { LinkedTextButton } from '../../components/Button/TextButton';
import { theme } from '../../assets/styles/GlobalStyles';

const Container = styled(HeaderContainer)``;

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
    if (!isAuth)
        return (
            <Container>
                <Logo src={ottle_black_512} />
                <LinkedTextButton
                    fontSize={theme.font.p12}
                    to={routes.profile()}
                >
                    로그인
                </LinkedTextButton>
            </Container>
        );
    return (
        <Container>
            <Link to={routes.profile()}>
                <Logo src={ottle_black_512} />
            </Link>
            <LinkedGradientButton
                to={isAuth && routes.ottleCreate(user.username)}
            >
                Create
            </LinkedGradientButton>
        </Container>
    );
};
