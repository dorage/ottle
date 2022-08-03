import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreenContainer } from '../../components/Layout/Container';
import { InputField } from '../../components/Input/InputField';
import {
    loadUserAsyncAction,
    selectUser,
    signOutAsyncAction,
} from '../../features/user/userSlice';
import { GradientSemiRoundButton } from '../../components/Button/GradientButton';
import { FooterContainer } from '../../components/Layout/Footer';
import { SemiRoundButton } from '../../components/Button/RoundButton';
import { checkUsername, setUserInfo } from '../../app/firestore';
import { useNavigate } from 'react-router-dom';
import { signOutFirebase } from '../../app/auth';

//#region styled-components
const Container = styled(FullScreenContainer)`
    display: flex;
    padding-top: 5rem;
`;
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
const Footer = styled(FooterContainer)``;
const Button = styled(SemiRoundButton)`
    padding: ${(props) => props.theme.gap.gap_8} 0;
    margin: 0 ${(props) => props.theme.gap.gap_4};
    background-color: ${(props) => props.theme.color.black_600};
    &:first-child {
        margin-left: 0;
    }
`;
const SubmitButton = styled(GradientSemiRoundButton)`
    padding: ${(props) => props.theme.gap.gap_8} 0;
    margin-left: ${(props) => props.theme.gap.gap_4};
`;
//#endregion

const errors = {
    none: { error: false, message: '' },
    length: { error: false, message: '최소 4자 최대 15자의 ID를 만들어주세요' },
    exist: { error: true, message: '이미 사용중인 ID 입니다' },
    valid: {
        error: true,
        message: '알파벳 a-z A-Z 특수기호 _ - 만 사용가능합니다',
    },
};

export const Registration = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(selectUser);
    const [error, setError] = useState(errors.none);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);

    const validateUsername = async () => {
        if (username.length < 4) {
            setError(errors.length);
            return false;
        }
        const match = username.match(/^[a-zA-Z_-]*$/g);
        if (!match) {
            setError(errors.valid);
            return false;
        }
        const exist = await checkUsername(username);
        if (exist) {
            setError(errors.exist);
            return false;
        }
        return true;
    };

    // TODO: 테스트 이후에 삭제하기
    const onSignOut = () => {
        dispatch(signOutAsyncAction(signOutFirebase));
    };

    const onSubmit = async () => {
        if (loading) return;
        setError(errors.none);
        try {
            setLoading(true);
            if (!(await validateUsername())) {
                setLoading(false);
                return;
            }
            await setUserInfo(user.uid, { name, username });
            dispatch(loadUserAsyncAction({ uid: user.uid }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container className='pad'>
            <div className='flex-1'>
                <h1>필수정보 입력</h1>
                <InputGroup>
                    <h2>이름</h2>
                    <InputField
                        value={name}
                        setValue={setName}
                        maxLength={10}
                        blank={false}
                    />
                </InputGroup>
                <InputGroup>
                    <h2>ID</h2>
                    <InputField
                        error={error.error}
                        msg={error.message}
                        value={username}
                        setValue={setUsername}
                        maxLength={15}
                        blank={false}
                    />
                </InputGroup>
            </div>
            <Footer>
                <Button className='flex-1' onClick={onSignOut}>
                    {'ㅤ'}
                </Button>
                <SubmitButton className='flex-1' onClick={onSubmit}>
                    {loading ? '확인중..' : '가입완료'}
                </SubmitButton>
            </Footer>
        </Container>
    );
};
