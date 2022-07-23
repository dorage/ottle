import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ProfileItems } from './Items';
import { ProfileInfo } from './Info';
import { selectUser } from '../../features/user/userSlice';
import { getOttleDocs } from '../../app/firestore';

export const Profile = () => {
    const { isAuth, loading, user } = useSelector(selectUser);

    useEffect(() => {
        if (user) getOttleDocs(user.uid);
    }, [user]);

    if (loading) return <></>;

    return user ? (
        <div>
            <ProfileInfo user={user} />
            <ProfileItems uid={user.uid} />
        </div>
    ) : (
        <></>
    );
};
