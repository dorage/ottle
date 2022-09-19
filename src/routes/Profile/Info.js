import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AiTwotoneAlert, AiFillNotification } from 'react-icons/ai';
import { theme } from '../../assets/styles/GlobalStyles';
import { signOutAsyncAction } from '../../features/user/userSlice';
import { signOutFirebase } from '../../app/auth';
import { ExLinkHoC } from '../../components/HOC/LinkHoC';
import { ShareHoC } from '../../components/HOC/ShareHoC';
import { UserContext } from '../../components/Context/UserContext';
import {
    LoadingBlock,
    LoadingFlex,
} from '../../components/OttleCreateItemDrawer/LoadingItem';
import { ProfileNotice } from './Notice';
import { CS_URL } from '../../vars/urls';
import { ActionBar, ActionBarItem } from '../../components/ActionBar';

//#region styled-components
const Container = styled.div`
    width: 100%;
    flex-direction: column;
    margin-bottom: ${(props) => props.theme.gap.gap_32};
`;
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
const Name = styled.span`
    font-weight: 700;
    font-size: ${(props) => props.theme.font.p14};
`;
const Username = styled.span`
    font-size: ${(props) => props.theme.font.p10};
`;
const Column = styled(Row)`
    flex-direction: column;
    padding: ${(props) => props.theme.gap.gap_8} 0;
    justify-content: center;
    align-items: center;
`;
const CopyActionBarItem = ShareHoC(ActionBarItem);
const ExLinkActionBarItem = ExLinkHoC(ActionBarItem);

//#endregion

export const ProfileInfo = () => {
    const dispatch = useDispatch();
    const { isMe, loading, user, error } = useContext(UserContext);

    const onSignOut = () => {
        dispatch(signOutAsyncAction(signOutFirebase()));
    };

    if (loading)
        return (
            <Container className='pad'>
                <Row>
                    <div>
                        <LoadingFlex length={10} fontSize={theme.font.p14} />
                        <br></br>
                        <LoadingFlex length={8} fontSize={theme.font.p10} />
                    </div>
                    <ActionBar>
                        <LoadingBlock length={5} fontSize={theme.font.p10} />
                    </ActionBar>
                </Row>
            </Container>
        );

    if (isMe)
        return (
            <Container className='pad'>
                <Column>
                    <ProfileNotice
                        icon={AiTwotoneAlert}
                        text={
                            '브랜드를 요청해주시면 빠르게 추가해드리고 있어요'
                        }
                        href={CS_URL.KAKAO}
                        color={'warning'}
                    />
                    <ProfileNotice
                        icon={AiFillNotification}
                        text={
                            '필요한 기능을 요청해주시면 검토 후 추가해드려요.'
                        }
                        href={CS_URL.KAKAO}
                        color={'success'}
                    />
                </Column>
                <Row>
                    <div>
                        <Name>{user.name || 'unnamed'}</Name>
                        <br></br>
                        <Username>{user.username}</Username>
                    </div>
                    <ActionBar>
                        <ActionBarItem onClick={onSignOut}>
                            로그아웃
                        </ActionBarItem>
                        <CopyActionBarItem
                            url={`${window.location.host}/${user.username}`}
                        >
                            공유하기
                        </CopyActionBarItem>
                        <ExLinkActionBarItem to='https://dorage.notion.site/1b9b37e0b0804e0b98fd9580c1b9797f'>
                            도움말
                        </ExLinkActionBarItem>
                    </ActionBar>
                </Row>
            </Container>
        );

    if (user)
        return (
            <Container className='pad'>
                <Row>
                    <div>
                        <Name>{user.name || 'unnamed'}</Name>
                        <br></br>
                        <Username>{user.username}</Username>
                    </div>
                    <ActionBar>
                        <CopyActionBarItem
                            url={`${window.location.host}/${user.username}`}
                        >
                            공유하기
                        </CopyActionBarItem>
                        <ExLinkActionBarItem to='https://dorage.notion.site/1b9b37e0b0804e0b98fd9580c1b9797f'>
                            도움말
                        </ExLinkActionBarItem>
                    </ActionBar>
                </Row>
            </Container>
        );

    if (error) return <></>;
};
