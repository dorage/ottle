import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Portrait } from '../../components/Layout/Portrait';
import { IconButton } from '../../components/Button/IconButton';
import { BsCaretDownFill } from 'react-icons/bs';
import { theme } from '../../assets/styles/GlobalStyles';
import { selectUser, signOutAsyncAction } from '../../features/user/userSlice';
import { signOutFirebase } from '../../app/auth';
import { ExLinkHoC } from '../../components/HOC/LinkHoC';
import { CopyClipboardHoC } from '../../components/HOC/CopyClipboardHoC';
import { UserContext } from './UserContext';
import {
    LoadingBlock,
    LoadingFlex,
} from '../../components/OttleCreateItemDrawer/LoadingItem';

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
const ActionBar = styled.div`
    display: flex;
    align-items: center;
`;
const ActionButton = styled(IconButton)`
    transform: rotate(0deg);
    transition: 0.3s linear;
    &.open {
        transform: rotate(90deg);
    }
`;
const Actions = styled.div`
    display: flex;
    opacity: 0;
    transition: 0.3s linear;
    transform: translateX(30%);
    &.open {
        opacity: 1;
        transform: translateX(0);
    }
`;
const PopOut = styled.div`
    position: relative;
    margin-left: ${(props) => props.theme.gap.gap_8};
`;
const CopyPopOut = CopyClipboardHoC(PopOut);
const ExLinkPopOut = ExLinkHoC(PopOut);

//#endregion

export const ProfileInfo = () => {
    const dispatch = useDispatch();
    const [actionBar, setActionBar] = useState(false);
    const { isMe, loading, user, error } = useContext(UserContext);

    const onClickActionBar = () => {
        setActionBar(!actionBar);
    };

    const onSignOut = () => {
        console.log('sign out');
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
                <Row>
                    <div>
                        <Name>{user.name || 'unnamed'}</Name>
                        <br></br>
                        <Username>{user.username}</Username>
                    </div>
                    <ActionBar>
                        <Actions className={actionBar && 'open'}>
                            <PopOut onClick={onSignOut}>로그아웃</PopOut>
                            <CopyPopOut
                                url={`${window.location.host}/${user.username}`}
                            >
                                공유하기
                            </CopyPopOut>
                            <ExLinkPopOut to='https://dorage.notion.site/1b9b37e0b0804e0b98fd9580c1b9797f'>
                                도움말
                            </ExLinkPopOut>
                        </Actions>
                        <ActionButton
                            className={actionBar && 'open'}
                            h={theme.font.p16}
                            active={true}
                            icon={<BsCaretDownFill />}
                            onClick={onClickActionBar}
                        />
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
                        <Actions className={actionBar && 'open'}>
                            <CopyPopOut
                                url={`${window.location.host}/${user.username}`}
                            >
                                공유하기
                            </CopyPopOut>
                            <ExLinkPopOut to='https://dorage.notion.site/1b9b37e0b0804e0b98fd9580c1b9797f'>
                                도움말
                            </ExLinkPopOut>
                        </Actions>
                        <ActionButton
                            className={actionBar && 'open'}
                            h={theme.font.p16}
                            active={true}
                            icon={<BsCaretDownFill />}
                            onClick={onClickActionBar}
                        />
                    </ActionBar>
                </Row>
            </Container>
        );

    if (error) return <></>;
};
