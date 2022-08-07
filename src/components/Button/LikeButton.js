import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { MODAL_TYPE, openModal } from '../../features/modal/modalSlice';
import { logEventFirebase } from '../../app/analytics';
import { TextButton } from './TextButton';
import { OttleLikeContext } from '../Context/OttleLikeContext';

//#region styled-components
//#endregion

let timer;
export const LikeButton = ({ ...props }) => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(selectUser);
    const {
        state: { like },
        actions: { toggleLike, fetchSetLike },
    } = useContext(OttleLikeContext);

    const onClickLike = () => {
        if (!like) logEventFirebase('like_ottle');
        else logEventFirebase('unlike_ottle');

        if (!isAuth) {
            dispatch(openModal({ type: MODAL_TYPE.SIGN_IN }));
            return;
        }

        toggleLike();

        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fetchSetLike();
        }, 500);
    };

    return (
        <TextButton onClick={onClickLike} {...props}>
            {like ? '안좋아요 :|' : '좋아요 :)'}
        </TextButton>
    );
};
