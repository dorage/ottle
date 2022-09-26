import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteOttle, hideOttle, showOttle } from '../../../app/firestore';
import { routes } from '../../../configs/routes';
import { closeModal } from '../../../features/modal/modalSlice';
import { selectUser } from '../../../features/user/userSlice';
import { YesNoModal } from '../Modals';

export const OttleDeleteModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(selectUser);
    const { pathname } = useLocation();

    return (
        <YesNoModal
            message={'옷뜰을 삭제할까요?'}
            onClickNo={() => {
                dispatch(closeModal());
            }}
            onClickYes={async () => {
                const nanoId = pathname.split('/').pop();
                await deleteOttle(user.uid, nanoId);
                navigate(routes.profile());
                dispatch(closeModal());
            }}
        />
    );
};

export const OttleShowModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(selectUser);
    const { pathname } = useLocation();
    return (
        <YesNoModal
            message={'옷뜰을 공개할까요?'}
            onClickNo={() => {
                dispatch(closeModal());
            }}
            onClickYes={async () => {
                const nanoId = pathname.split('/').pop();
                await showOttle(user.uid, nanoId);
                navigate(routes.profile());
                dispatch(closeModal());
            }}
        />
    );
};

export const OttleHideModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(selectUser);
    const { pathname } = useLocation();
    return (
        <YesNoModal
            message={'옷뜰을 숨길까요?'}
            onClickNo={() => {
                dispatch(closeModal());
            }}
            onClickYes={async () => {
                const nanoId = pathname.split('/').pop();
                await hideOttle(user.uid, nanoId);
                navigate(routes.profile());
                dispatch(closeModal());
            }}
        />
    );
};
