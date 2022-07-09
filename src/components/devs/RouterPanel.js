import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from '../../configs/routes';

const Section = styled.div`
    position: absolute;
    top: 0px;
    z-index: 999;
`;
const Button = styled.button`
    display: block;

    text-decoration: none;
`;

export const RouterPanel = () => {
    const [show, setShow] = useState(false);

    const onClickToggle = () => {
        setShow(!show);
    };

    return (
        <Section>
            <Button onClick={onClickToggle}>SHOW</Button>
            {show && (
                <>
                    <Link to={routes.main}>
                        <Button>{routes.main}</Button>
                    </Link>
                    <Link to={routes.ottleCreate}>
                        <Button>{routes.ottleCreate}</Button>
                    </Link>
                    <Link to={routes.ottleDetail(1)}>
                        <Button>{routes.ottleDetail()}</Button>
                    </Link>
                    <Link to={routes.ottleEdit(1)}>
                        <Button>{routes.ottleEdit()}</Button>
                    </Link>
                    <Link to={routes.productDetail(1)}>
                        <Button>{routes.productDetail()}</Button>
                    </Link>
                    <Link to={routes.likes}>
                        <Button>{routes.likes}</Button>
                    </Link>
                    <Link to={routes.boards}>
                        <Button>{routes.boards}</Button>
                    </Link>
                    <Link to={routes.profile}>
                        <Button>{routes.profile}</Button>
                    </Link>
                    <Link to={routes.settings}>
                        <Button>{routes.settings}</Button>
                    </Link>
                    <Link to={routes.pageNotFound}>
                        <Button>{routes.pageNotFound}</Button>
                    </Link>
                </>
            )}
        </Section>
    );
};
