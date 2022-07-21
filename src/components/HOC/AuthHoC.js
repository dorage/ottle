import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { initAuth } from '../../app/auth';
import { checkAuth } from '../../features/user/userSlice';

export const AuthHoC = (Component) => (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        initAuth((payload) => dispatch(checkAuth(payload)));
    }, []);

    return (
        <>
            <Component {...props} />
        </>
    );
};
