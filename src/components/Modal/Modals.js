import React from 'react';
import styled from 'styled-components';

//#region styled-components
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

export const YesNoModal = ({ message, onClickYes, onClickNo }) => (
    <ModalContainer>
        <Content>{message}</Content>
        <ButtonRow>
            <Button onClick={onClickYes}>예</Button>
            <Button onClick={onClickNo}>아니요</Button>
        </ButtonRow>
    </ModalContainer>
);

export const OkModal = ({ message, onClickOk }) => (
    <ModalContainer>
        <Content>{message}</Content>
        <ButtonRow>
            <Button onClick={onClickOk}>확인</Button>
        </ButtonRow>
    </ModalContainer>
);
