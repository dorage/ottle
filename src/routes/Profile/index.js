import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { ProfileItems } from './Items';
import { ProfileInfo } from './Info';
import { selectUser } from '../../features/user/userSlice';
import {
    myOttlesAsyncAction,
    selectMyOttles,
} from '../../features/profile/myOttlesSlice';

export const Profile = () => {
    const dispatch = useDispatch();
    const { setOnScrollEvent } = useOutletContext();
    const { user } = useSelector(selectUser);
    const { data, loading } = useSelector(selectMyOttles);

    const fetchData = () => {
        const { uid } = user;
        dispatch(myOttlesAsyncAction(uid));
    };

    useEffect(() => {
        fetchData();
        setOnScrollEvent((pageRef) => (e) => {
            if (
                pageRef.current.scrollHeight -
                    (pageRef.current.scrollTop + pageRef.current.clientHeight) <
                window.innerHeight / 2
            ) {
                console.log('fetch data');
                //fetchData();
            }
        });
    }, []);

    return user ? (
        <div>
            <ProfileInfo user={user} />
            {loading ? (
                <></>
            ) : data ? (
                <ProfileItems user={user} ottles={data} />
            ) : (
                <></>
            )}
            <button
                onClick={() => {
                    const { uid } = user;
                    dispatch(myOttlesAsyncAction(uid));
                }}
            >
                load more
            </button>
        </div>
    ) : (
        <></>
    );
};
