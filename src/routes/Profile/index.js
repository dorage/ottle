import React from 'react';
import { ProfileItems } from './Items';
import { ProfileInfo } from './Info';
import { UserContextProvider } from './UserContext';
import { UserOttleContextProvider } from './UserOttleContext';

export const Profile = () => {
    return (
        <UserContextProvider>
            <UserOttleContextProvider>
                <ProfileInfo />
                <ProfileItems />
            </UserOttleContextProvider>
        </UserContextProvider>
    );
};
