import React from 'react';
import { ProfileItems } from './Items';
import { ProfileInfo } from './Info';
import { UserContextProvider } from '../../components/Context/UserContext';
import { UserOttlesContextProvider } from '../../components/Context/UserOttlesContext';
import { ProfileNotices } from './Notices';

export const Profile = () => {
    return (
        <UserContextProvider>
            <UserOttlesContextProvider>
                <ProfileNotices />
                <ProfileInfo />
                <ProfileItems />
            </UserOttlesContextProvider>
        </UserContextProvider>
    );
};
