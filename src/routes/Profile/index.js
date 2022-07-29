import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ProfileItems } from './Items';
import { ProfileInfo } from './Info';
import { selectUser } from '../../features/user/userSlice';
import { getOttlesOfUser } from '../../app/firestore';

export const Profile = () => {
    const { user } = useSelector(selectUser);

    useEffect(() => {
        if (user) getOttlesOfUser(user.uid);
    }, [user]);

    return user ? (
        <div>
            <ProfileInfo user={user} />
            <ProfileItems user={user} />
        </div>
    ) : (
        <></>
    );
};
