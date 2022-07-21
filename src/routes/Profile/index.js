import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ProfileItems } from './Items';
import { ProfileInfo } from './Info';
import { selectUser } from '../../features/user/userSlice';

export const Profile = () => {
    const user = useSelector(selectUser);
    return (
        <div>
            <ProfileInfo user={user} />
            <ProfileItems />
        </div>
    );
};
