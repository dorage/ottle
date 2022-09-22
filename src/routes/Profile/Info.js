import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
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
const CopyActionBarItem = ShareHoC(ActionBarItem);
const ExLinkActionBarItem = ExLinkHoC(ActionBarItem);

//#endregion

export const ProfileInfo = () => {
    const dispatch = useDispatch();
    const { isMe, loading, user } = useContext(UserContext);

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

    return (
        <Container className='pad'>
            <Row>
                <div>
                    <Name>{user.name || 'unnamed'}</Name>
                    <br></br>
                    <Username>{user.username}</Username>
                </div>
                <ActionBar>
                    {isMe ? (
                        <ActionBarItem onClick={onSignOut}>
                            로그아웃
                        </ActionBarItem>
                    ) : (
                        <></>
                    )}
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
};
