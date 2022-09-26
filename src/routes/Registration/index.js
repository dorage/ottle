import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreenContainer } from '../../components/Layout/Container';
import { InputField } from '../../components/Input/InputField';
import { loadUserAsyncAction, selectUser } from '../../features/user/userSlice';
import { GradientSemiRoundButton } from '../../components/Button/GradientButton';
import { FooterContainer } from '../../components/Layout/Footer';
import { SemiRoundButton } from '../../components/Button/RoundButton';
import { checkUsername, setUserInfo } from '../../app/firestore';

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
    length: (min, max) => ({
        error: true,
        message: `최소 ${min}자, 최대 ${max}자를 적어주세요`,
    }),
    exist: { error: true, message: '이미 사용중인 ID 입니다' },
    valid: {
        error: true,
        message: '영문자 a-z 특수기호 _ - 만 사용가능합니다',
    },
};

const initialState = ({ value = '', error = false, message = '' }) => ({
    value,
    error,
    message,
});

export const Registration = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(selectUser);
    const [validating, setValidating] = useState(false);
    const [nameState, setNameState] = useState(initialState({}));
    const [usernameState, setUsernameState] = useState(initialState({}));

    const nameValidator = async (value) => {
        if (value.length < 2 || value.length > 15) {
            setNameState({ ...nameState, ...errors.length(2, 15) });
            return false;
        }
        setNameState({ ...nameState, ...errors.none });
        return true;
    };

    const usernameValidator = async (value) => {
        const match = value.match(/^[a-z_-]*$/g);
        if (!match) {
            setUsernameState({ ...usernameState, ...errors.valid });
            return false;
        }
        if (value.length < 4 || value.length > 15) {
            setUsernameState({ ...usernameState, ...errors.length(4, 15) });
            return false;
        }
        const exist = await checkUsername(value);
        if (exist) {
            setUsernameState({ ...usernameState, ...errors.exist });
            return false;
        }
        setUsernameState({ ...usernameState, ...errors.none });
        return true;
    };

    const onSubmit = async () => {
        setNameState({ ...nameState, error: false });
        setUsernameState({ ...usernameState, error: false });
        if (validating) return;
        const name = nameState.value.slice(0, 15);
        const username = usernameState.value.toLowerCase().slice(0, 15);
        try {
            setValidating(true);
            if (
                [
                    await nameValidator(name),
                    await usernameValidator(username),
                ].some((e) => !e)
            ) {
                setValidating(false);
                return;
            }
            await setUserInfo(user.uid, {
                name,
                username,
            });
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
                        {...nameState}
                        setValue={(value) =>
                            setNameState({
                                ...nameState,
                                value,
                            })
                        }
                        maxLength={15}
                        blank={false}
                    />
                </InputGroup>
                <InputGroup>
                    <h2>ID</h2>
                    <InputField
                        {...usernameState}
                        setValue={(value) =>
                            setUsernameState({
                                ...usernameState,
                                value,
                            })
                        }
                        lowercase={true}
                        maxLength={15}
                        blank={false}
                    />
                </InputGroup>
            </div>
            <Footer>
                <Button className='flex-1'>{'ㅤ'}</Button>
                <SubmitButton className='flex-1' onClick={onSubmit}>
                    {validating ? '확인중..' : '가입완료'}
                </SubmitButton>
            </Footer>
        </Container>
    );
};
