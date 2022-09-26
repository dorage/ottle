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
import { FullScreenContainer } from '../Layout/Container';
import {
    OttleDeleteModal,
    OttleHideModal,
    OttleShowModal,
} from './Variants/Ottle';
import { OttleCreateGoBackModal } from './Variants/OttleCreate';
import { AuthNotSignInModal } from './Variants/Auth';

//#region styled-components
const OuterContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    background-color: rgba(99, 99, 99, 0.3);
    overflow: hidden;
    z-index: ${(props) => props.theme.zindex.modal};
    box-sizing: border-box;
`;

const InnerContainer = styled(FullScreenContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 ${(props) => props.theme.gap.gap_64};

    background-color: transparent;
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
    font-size: ${(props) => props.theme.font.p16};
    font-weight: 600;
`;
const ButtonRow = styled.div`
    display: flex;
`;
const Button = styled.div`
    flex: 1;
    padding-top: ${(props) => props.theme.gap.gap_8};
    padding-bottom: ${(props) => props.theme.gap.gap_8};
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
                <OuterContainer>
                    <InnerContainer>
                        <ModalSwitcher />
                    </InnerContainer>
                </OuterContainer>
            )}
        </ModalPortal>
    );
};

const ModalSwitcher = () => {
    const dispatch = useDispatch();
    const { type } = useSelector(selectModal);

    switch (type) {
        case MODAL_TYPE.AUTH.NOT_SIGN_IN:
            return <AuthNotSignInModal />;
        case MODAL_TYPE.OTTLE.DELETE:
            return <OttleDeleteModal />;
        case MODAL_TYPE.OTTLE.SHOW:
            return <OttleShowModal />;
        case MODAL_TYPE.OTTLE.HIDE:
            return <OttleHideModal />;
        case MODAL_TYPE.OTTLE_CREATE.GO_BACK:
            return <OttleCreateGoBackModal />;
        default:
            dispatch(closeModal());
            return <></>;
    }
};
