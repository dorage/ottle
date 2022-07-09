import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Container = styled.div``;

export const Layout = (props) => {
    const location = useLocation();

    useEffect(() => {
        console.log(location);
    }, []);

    return (
        <Container>
            <Header />
            <Outlet />
            <Footer pathname={location.pathname} />
        </Container>
    );
};
