import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreenContainer } from '../../components/Layout/Container';
import { InputField } from '../../components/Input/InputField';
import { loadUserAsyncAction, selectUser } from '../../features/user/userSlice';
import { GradientSemiRoundButton } from '../../components/Button/GradientButton';
import { FooterContainer } from '../../components/Layout/Footer';
import { SemiRoundButton } from '../../components/Button/RoundButton';
import { checkUsername, setUserInfo } from '../../app/firestore';
import { useNavigate } from 'react-router-dom';

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

export const Registration = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(selectUser);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);

    const onSubmit = async () => {
        if (loading) return;
        setError(false);
        try {
            setLoading(true);
            const exist = await checkUsername(username);
            if (exist) {
                setLoading(false);
                setError(exist);
                return;
            }
            await setUserInfo(user.uid, { name, username });
            dispatch(loadUserAsyncAction(user.uid));
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
                    <InputField value={name} setValue={setName} />
                </InputGroup>
                <InputGroup>
                    <h2>ID</h2>
                    <InputField
                        error={error}
                        msg={'이미 사용중인 ID 입니다'}
                        value={username}
                        setValue={setUsername}
                    />
                </InputGroup>
            </div>
            <Footer>
                <Button className='flex-1'>{'ㅤ'}</Button>
                <SubmitButton className='flex-1' onClick={onSubmit}>
                    {loading ? '확인중..' : '가입완료'}
                </SubmitButton>
            </Footer>
        </Container>
    );
};
