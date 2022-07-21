import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ModalPortal } from '../Portal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, selectModal } from '../../features/modal/modalSlice';

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
    padding-top: ${(props) => props.theme.gap.gap_16};
    padding-bottom: ${(props) => props.theme.gap.gap_16};
    padding-right: ${(props) => props.theme.gap.gap_16};
    padding-left: ${(props) => props.theme.gap.gap_16};

    text-align: center;
    font-size: ${(props) => props.theme.font.p18};
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

    border: 1px solid ${(props) => props.theme.color.black_600};
    font-size: ${(props) => props.theme.font.p14};
    text-align: center;
    &.highlight {
    }
`;
//#endregion

export const Modal = () => {
    const dispatch = useDispatch();
    const { isOpend, onYesAction, onNoAction } = useSelector(selectModal);

    const onClickNo = () => {
        dispatch(closeModal());
        onNoAction && onNoAction();
    };
    const onClickYes = () => {
        dispatch(closeModal());
        onYesAction && onYesAction();
    };

    return (
        <ModalPortal>
            {isOpend && (
                <Container>
                    <ModalContainer>
                        <Content>그만 만드실건가요?</Content>
                        <ButtonRow>
                            <Button onClick={onClickYes}>예</Button>
                            <Button onClick={onClickNo}>아니요</Button>
                        </ButtonRow>
                    </ModalContainer>
                </Container>
            )}
        </ModalPortal>
    );
};
