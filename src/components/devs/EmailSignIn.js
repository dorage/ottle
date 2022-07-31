import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SemiRoundButton } from '../Button/RoundButton';
import { InputField } from '../Input/InputField';
import {
    selectUser,
    signInAsyncAction,
    signOutAsyncAction,
} from '../../features/user/userSlice';
import { signInWithEmailPassword, signOutFirebase } from '../../app/auth';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;

    border: 1px solid black;
    border-radius: 10px;
`;

const accounts = [
    { email: 'root@root.io', password: '123123' },
    { email: 'test@test.io', password: '123123' },
];

export const EmailSignIn = () => {
    const [data, setData] = useState(accounts[0]);
    const dispatch = useDispatch();
    const { isAuth, user, loading } = useSelector(selectUser);

    if (loading) return <Container></Container>;

    const onSignIn = (e) => {
        e.preventDefault();
        dispatch(
            signInAsyncAction(
                signInWithEmailPassword(data.email, data.password)
            )
        );
    };
    const onSignOut = (e) => {
        e.preventDefault();
        dispatch(signOutAsyncAction(signOutFirebase()));
    };
    const onClickAccount = (idx) => {
        setData(accounts[idx]);
    };

    return (
        <Container>
            {isAuth ? (
                <>
                    <div>Hello, {user.name || 'unnamed'}!</div>
                </>
            ) : (
                <>
                    <div>
                        {accounts.map((_, idx) => (
                            <button onClick={() => onClickAccount(idx)}>
                                {idx}
                            </button>
                        ))}
                    </div>
                    <div>
                        <h3>이메일</h3>
                        <InputField value={data.email} readOnly />
                        <h3>비밀번호</h3>
                        <InputField value={data.password} readOnly />
                    </div>
                    <div>
                        <SemiRoundButton onClick={onSignIn}>
                            로그인
                        </SemiRoundButton>
                    </div>
                </>
            )}
        </Container>
    );
};
