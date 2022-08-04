import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmailSignIn } from '../../components/devs/EmailSignIn';
import { signInAsyncAction } from '../../features/user/userSlice';
import { signInWithFacebook, signInWithGoogle } from '../../app/auth';
import { useDispatch } from 'react-redux';

//#region styled-components
const Container = styled.div``;
//#endregion

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
        <Container>
            <button onClick={onClickGoogleSignIn}>google 로그인</button>
            <button onClick={onClickFacebookSignIn}>facebook 로그인</button>
        </Container>
    );
};
