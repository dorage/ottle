import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../features/modal/modalSlice';
import { OkModal } from '../Modals';

export const AuthNotSignInModal = () => {
    const dispatch = useDispatch();
    return (
        <OkModal
            message={'로그인이 필요합니다'}
            onClickOk={() => {
                dispatch(closeModal());
            }}
        />
    );
};
