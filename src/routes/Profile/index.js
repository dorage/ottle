import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { LoadingProfileItems, ProfileItems } from './Items';
import { ProfileInfo } from './Info';
import { selectUser } from '../../features/user/userSlice';
import {
    myOttlesAsyncAction,
    selectMyOttles,
} from '../../features/profile/myOttlesSlice';

const switcher = () => {
    let loading = false;
    return (func) => {};
};

export const Profile = () => {
    const dispatch = useDispatch();
    const { setOnScrollEvent } = useOutletContext();
    const { user } = useSelector(selectUser);
    const { lastPage } = useSelector(selectMyOttles);

    const fetchData = () => {
        if (lastPage) return;
        const { uid } = user;
        dispatch(myOttlesAsyncAction(uid));
    };

    useEffect(() => {
        fetchData();
        setOnScrollEvent((pageRef) => (e) => {
            if (
                pageRef.current.scrollHeight -
                    (pageRef.current.scrollTop +
                        pageRef.current.clientHeight) ===
                0
            ) {
                fetchData();
            }
        });
    }, []);

    return user ? (
        <>
            <ProfileInfo user={user} />
            <ProfileItems user={user} />
        </>
    ) : (
        <></>
    );
};
