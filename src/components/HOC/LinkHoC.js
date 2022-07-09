import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const LinkHoC = (Component) => (props) => {
    const to = props.to;
    return (
        <Link to={to}>
            <Component {...props} />
        </Link>
    );
};
