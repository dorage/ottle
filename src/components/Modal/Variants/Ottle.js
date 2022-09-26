import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../configs/routes';
import { closeModal } from '../../../features/modal/modalSlice';
import { YesNoModal } from '../Modals';

export const OttleDeleteModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <YesNoModal
            message={'옷뜰을 삭제할까요?'}
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
export const OttleShowModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <YesNoModal
            message={'옷뜰을 공개할까요?'}
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
export const OttleHideModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <YesNoModal
            message={'옷뜰을 숨길까요?'}
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
