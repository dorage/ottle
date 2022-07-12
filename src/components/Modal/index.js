import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ModalPortal } from '../Portal';

/*
TODO; 모달이 추가되어야 하는 곳
1. 캔버스 아이템 삭제시
2. 캔버스에서 나가려 할 때
*/

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
    return (
        <ModalPortal>
            {false && (
                <Container>
                    <ModalContainer>
                        <Content>정말 삭제할까요?</Content>
                        <ButtonRow>
                            <Button>아니요</Button>
                            <Button>예</Button>
                        </ButtonRow>
                    </ModalContainer>
                </Container>
            )}
        </ModalPortal>
    );
};
