import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    display: block;
`;

export const LinkHoC = (Component) => ({ to, className, ...props }) => {
    return (
        <StyledLink to={to} className={className}>
            <Component {...props} />
        </StyledLink>
    );
};
