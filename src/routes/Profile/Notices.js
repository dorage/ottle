import React from 'react';
import styled from 'styled-components';
import { AiTwotoneAlert, AiFillNotification } from 'react-icons/ai';
import { ProfileNotice } from './Notice';
import { CS_URL } from '../../vars/urls';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

//#region styled-components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
//#endregion

export const ProfileNotices = () => {
    const { loading, isAuth } = useSelector(selectUser);

    if (loading) return <></>;
    if (!isAuth) return <></>;

    return (
        <Container className='pad'>
            <ProfileNotice
                icon={AiTwotoneAlert}
                text={'브랜드를 요청해주시면 빠르게 추가해드리고 있어요'}
                href={CS_URL.KAKAO}
                color={'warning'}
            />
            <ProfileNotice
                icon={AiFillNotification}
                text={'필요한 기능을 요청해주시면 검토 후 추가해드려요.'}
                href={CS_URL.KAKAO}
                color={'success'}
            />
        </Container>
    );
};
