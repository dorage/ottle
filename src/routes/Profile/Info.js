import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Portrait } from '../../components/Layout/Portrait';
import { IconButton } from '../../components/Button/IconButton';
import { BsCaretDownFill } from 'react-icons/bs';
import { theme } from '../../assets/styles/GlobalStyles';
import pic from '../../assets/images/temp.jpg';
import { signOutAsyncAction } from '../../features/user/userSlice';
import { signOutFirebase } from '../../app/auth';

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
const FigureGroups = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const FigureGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Figure = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => props.theme.gap.gap_4};
    font-weight: 700;
    font-size: ${(props) => props.theme.font.p16};
`;
const FigureLabel = styled.div`
    font-size: ${(props) => props.theme.font.p14};
`;
const Username = styled.div`
    font-weight: 700;
    font-size: ${(props) => props.theme.font.p16};
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
`;

//#endregion

export const ProfileInfo = ({ user }) => {
    const dispatch = useDispatch();
    const [actionBar, setActionBar] = useState(false);

    const onClickActionBar = () => {
        setActionBar(!actionBar);
    };

    const onSignOut = () => {
        dispatch(signOutAsyncAction(signOutFirebase()));
    };

    return (
        <Container className='pad'>
            <Row>
                <div className='flex-1'>
                    <Portrait src={user.profile_src} />
                </div>
                <FigureGroups className='flex-3'>
                    <Figure>{user.ottle_count}개의 옷뜰을 만들었어요</Figure>
                    {/*
                    <FigureGroup>
                        <Figure>2</Figure>
                        <FigureLabel>옷뜰</FigureLabel>
                    </FigureGroup>
                    <FigureGroup>
                        <Figure>152</Figure>
                        <FigureLabel>좋아요</FigureLabel>
                    </FigureGroup>
                    */}
                </FigureGroups>
            </Row>
            <Row>
                <Username>{user.name || 'unnamed'}</Username>
                <ActionBar>
                    <Actions className={actionBar && 'open'}>
                        <PopOut onClick={onSignOut}>로그아웃</PopOut>
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
};
