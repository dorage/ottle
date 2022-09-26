import React from 'react';
import styled from 'styled-components';
import { LoadingBlock } from '../OttleCreateItemDrawer/LoadingItem';
import { ActionBar, ActionBarItem } from '../ActionBar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { MODAL_TYPE, openModal } from '../../features/modal/modalSlice';

//#region styled-components
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.gap.gap_4};
`;
const Name = styled.div`
    font-size: ${(props) => props.theme.font.p14};
    font-weight: 700;
`;
const Username = styled.div`
    font-size: ${(props) => props.theme.font.p10};
`;

//#endregion

export const OttleHeader = ({ loading, ottle, user }) => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const { isAuth } = useSelector(selectUser);

    const onClickShow = () => {
        dispatch(
            openModal({
                type: MODAL_TYPE.OTTLE.SHOW,
            })
        );
    };

    const onClickHide = () => {
        dispatch(
            openModal({
                type: MODAL_TYPE.OTTLE.HIDE,
            })
        );
    };

    const onClickDelete = () => {
        dispatch(
            openModal({
                type: MODAL_TYPE.OTTLE.DELETE,
            })
        );
    };

    // 로딩중
    if (loading)
        return (
            <Container>
                <div>
                    <Name>
                        <LoadingBlock length={5} />
                    </Name>
                    <Username>
                        <LoadingBlock length={5} />
                    </Username>
                </div>
                {isAuth && (
                    <div>
                        <LoadingBlock length={3} />
                    </div>
                )}
            </Container>
        );

    return (
        <Container>
            <div>
                <Name>{user.name}</Name>
                <Username>@{user.username}</Username>
            </div>
            {isAuth && user.username === username && (
                <ActionBar>
                    {ottle.isPrivate ? (
                        <ActionBarItem onClick={onClickShow}>
                            공개하기
                        </ActionBarItem>
                    ) : (
                        <ActionBarItem onClick={onClickHide}>
                            숨기기
                        </ActionBarItem>
                    )}
                    <ActionBarItem onClick={onClickDelete}>
                        삭제하기
                    </ActionBarItem>
                </ActionBar>
            )}
        </Container>
    );
};
