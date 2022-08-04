import React, { useState } from 'react';
import styled from 'styled-components';
import { signInAsyncAction } from '../../features/user/userSlice';
import { signInWithFacebook, signInWithGoogle } from '../../app/auth';
import { useDispatch } from 'react-redux';
import { ImGoogle2, ImFacebook2 } from 'react-icons/im';
import { SemiRoundButton } from '../../components/Button/RoundButton';
import { theme } from '../../assets/styles/GlobalStyles';

//#region styled-components
const Container = styled.div``;

const SocialSignInButton = styled(SemiRoundButton)`
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: ${(props) => props.theme.gap.gap_16};
    padding-bottom: ${(props) => props.theme.gap.gap_16};
    margin-bottom: ${(props) => props.theme.gap.gap_8};

    text-align: left;
    border: 1px solid ${(props) => props.theme.color.black_600};
    border-radius: 0.5rem;
    font-size: ${(props) => props.theme.font.p16};

    & > svg {
        margin-right: ${(props) => props.theme.gap.gap_16};
    }
`;
const TextSection = styled.div``;
//#endregion

const SocialSignIn = ({ name, bg, onClick, children }) => (
    <SocialSignInButton bg={bg} onClick={onClick}>
        {children}
        <TextSection>{name} 아이디 로그인</TextSection>
    </SocialSignInButton>
);

export const SignIn = () => {
    const dispatch = useDispatch();
    const onClickGoogleSignIn = (e) => {
        e.preventDefault();
        dispatch(signInAsyncAction(signInWithGoogle()));
    };
    const onClickFacebookSignIn = (e) => {
        e.preventDefault();
        dispatch(signInAsyncAction(signInWithFacebook()));
    };
    return (
        <Container className='pad'>
            <h1>로그인 및 회원가입</h1>

            <SocialSignIn
                name='구글'
                bg={theme.color.auth.google}
                onClick={onClickGoogleSignIn}
            >
                <ImGoogle2 />
            </SocialSignIn>
            <SocialSignIn
                name='페이스북'
                bg={theme.color.auth.facebook}
                onClick={onClickFacebookSignIn}
            >
                <ImFacebook2 />
            </SocialSignIn>
        </Container>
    );
};
