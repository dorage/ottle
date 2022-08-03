import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ModalPortal } from '../Portal';
import { useDispatch, useSelector } from 'react-redux';
import {
    closeModal,
    MODAL_TYPE,
    selectModal,
} from '../../features/modal/modalSlice';

//#region styled-components
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 0 ${(props) => props.theme.gap.gap_64};

    background-color: rgba(99, 99, 99, 0.3);
    overflow: hidden;
    z-index: ${(props) => props.theme.zindex.modal};
`;

const ModalContainer = styled.div`
    width: 100%;

    border: 1px solid ${(props) => props.theme.color.black_600};
    border-radius: ${(props) => props.theme.gap.gap_8};
    background-color: white;
`;
const Content = styled.div`
    padding-top: ${(props) => props.theme.gap.gap_32};
    padding-bottom: ${(props) => props.theme.gap.gap_32};
    padding-right: ${(props) => props.theme.gap.gap_16};
    padding-left: ${(props) => props.theme.gap.gap_16};

    text-align: center;
    font-size: ${(props) => props.theme.font.p16};
    font-weight: 600;
`;
const ButtonRow = styled.div`
    display: flex;
`;
const Button = styled.div`
    flex: 1;
    padding-top: ${(props) => props.theme.gap.gap_16};
    padding-bottom: ${(props) => props.theme.gap.gap_16};
    padding-right: ${(props) => props.theme.gap.gap_16};
    padding-left: ${(props) => props.theme.gap.gap_16};

    border-top: 1px solid ${(props) => props.theme.color.black_600};
    font-size: ${(props) => props.theme.font.p14};
    text-align: center;
    &.highlight {
    }
`;
//#endregion

export const Modal = () => {
    const { isOpend } = useSelector(selectModal);

    return (
        <ModalPortal>
            {isOpend && (
                <Container>
                    <ModalSwitcher />
                </Container>
            )}
        </ModalPortal>
    );
};

const ModalSwitcher = () => {
    const dispatch = useDispatch();
    const { type, message } = useSelector(selectModal);

    switch (type) {
        case MODAL_TYPE.YES_OR_NO:
            return <ModalYesOrNo message={message} />;
        case MODAL_TYPE.SIGN_IN:
            return <ModalSignIn />;
        default:
            dispatch(closeModal());
            return <></>;
    }
};

const ModalSignIn = () => {
    const dispatch = useDispatch();

    const onClickYes = async () => {
        dispatch(closeModal());
    };

    return (
        <ModalContainer>
            <Content>로그인 후 '좋아요'가 가능합니다</Content>
            <ButtonRow>
                <Button onClick={onClickYes}>OK</Button>
            </ButtonRow>
        </ModalContainer>
    );
};

const ModalYesOrNo = ({ message }) => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const onClickNo = async () => {
        dispatch(closeModal());
    };
    const onClickYes = async () => {
        navigator(-1);
        dispatch(closeModal());
    };

    return (
        <ModalContainer>
            <Content>{message}</Content>
            <ButtonRow>
                <Button onClick={onClickYes}>예</Button>
                <Button onClick={onClickNo}>아니요</Button>
            </ButtonRow>
        </ModalContainer>
    );
};
