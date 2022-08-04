import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    display: block;
    color: inherit;
    text-decoration: none;
`;

export const LinkHoC = (Component) => ({ to, className, ...props }) => {
    return (
        <StyledLink to={to} className={className}>
            <Component {...props} />
        </StyledLink>
    );
};

const ExLink = styled.a`
    display: block;
    color: inherit;
    text-decoration: none;
`;

export const ExLinkHoC = (Component) => ({ to, className, ...props }) => {
    let url = to;
    if (!to.match(/(http:\/\/)|(https:\/\/)/g)) url = `https://${to}`;
    return (
        <ExLink href={url} target='_blank'>
            <Component {...props} />
        </ExLink>
    );
};
