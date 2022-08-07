import React from 'react';
import { ProfileItems } from './Items';
import { ProfileInfo } from './Info';
import { UserContextProvider } from '../../components/Context/UserContext';
import { UserOttlesContextProvider } from '../../components/Context/UserOttlesContext';

export const Profile = () => {
    return (
        <UserContextProvider>
            <UserOttlesContextProvider>
                <ProfileInfo />
                <ProfileItems />
            </UserOttlesContextProvider>
        </UserContextProvider>
    );
};
