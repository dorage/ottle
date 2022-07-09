import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { route } from '../../configs/routes';

const Section = styled.section`
    position: absolute;
`;
const Button = styled.button`
    display: block;

    text-decoration: none;
`;

export const RouterPanel = () => {
    const [show, setShow] = useState(true);

    const onClickToggle = () => {
        setShow(!show);
    };

    return (
        <Section>
            <Button onClick={onClickToggle}>SHOW</Button>
            {show && (
                <>
                    <Link to={route.main}>
                        <Button>{route.main}</Button>
                    </Link>
                    <Link to={route.ottleCreate}>
                        <Button>{route.ottleCreate}</Button>
                    </Link>
                    <Link to={route.ottleDetail(1)}>
                        <Button>{route.ottleDetail()}</Button>
                    </Link>
                    <Link to={route.ottleEdit(1)}>
                        <Button>{route.ottleEdit()}</Button>
                    </Link>
                    <Link to={route.productDetail(1)}>
                        <Button>{route.productDetail()}</Button>
                    </Link>
                    <Link to={route.likes}>
                        <Button>{route.likes}</Button>
                    </Link>
                    <Link to={route.boards}>
                        <Button>{route.boards}</Button>
                    </Link>
                    <Link to={route.profile}>
                        <Button>{route.profile}</Button>
                    </Link>
                    <Link to={route.settings}>
                        <Button>{route.settings}</Button>
                    </Link>
                    <Link to={route.pageNotFound}>
                        <Button>{route.pageNotFound}</Button>
                    </Link>
                </>
            )}
        </Section>
    );
};
