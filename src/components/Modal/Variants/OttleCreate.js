import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../configs/routes';
import { closeModal } from '../../../features/modal/modalSlice';
import { YesNoModal } from '../Modals';

export const OttleCreateGoBackModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <YesNoModal
            message={'옷뜰 만들기를 그만할까요?'}
            onClickNo={() => {
                dispatch(closeModal());
            }}
            onClickYes={() => {
                navigate(routes.profile());
                dispatch(closeModal());
            }}
        />
    );
};
