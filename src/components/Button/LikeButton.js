import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IconButton } from './IconButton';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import {
    deleteOttleLike,
    getOttleLike,
    setOttleLike,
} from '../../app/firestore';
import { selectUser } from '../../features/user/userSlice';

//#region styled-components
const Container = styled.div``;
//#endregion

let timer;
export const LikeButton = ({ initialValue, ottleId }) => {
    const { isAuth, user } = useSelector(selectUser);
    const [like, setLike] = useState(initialValue);

    const toggleLike = () => {
        setLike(!like);
    };

    // db에 fetch
    const fetchLike = async () => {
        console.log('do once');
        if (like) {
            await deleteOttleLike(user.uid, ottleId);
        } else {
            await setOttleLike(user.uid, ottleId);
        }
    };

    useEffect(() => {
        console.log(like);
    }, [like]);

    const onClickLike = () => {
        if (!isAuth) {
            // TODO ; sign in 모달 On
            return;
        }
        toggleLike();

        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fetchLike();
        }, 500);
    };

    return (
        <IconButton
            active={true}
            onClick={onClickLike}
            icon={like ? <HiHeart /> : <HiOutlineHeart />}
        />
    );
};
