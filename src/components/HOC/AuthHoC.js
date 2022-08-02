import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { initAuth } from '../../app/auth';
import { checkAuth, selectUser } from '../../features/user/userSlice';
import { LoadingAuth } from '../Loading/LoadingAuth';

export const AuthHoC = (Component) => (props) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(selectUser);

    useEffect(() => {
        initAuth((payload) => dispatch(checkAuth(payload)));
    }, []);

    if (loading) return <LoadingAuth />;

    return (
        <>
            <Component {...props} />
        </>
    );
};
