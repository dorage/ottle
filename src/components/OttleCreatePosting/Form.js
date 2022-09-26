import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { InputField } from '../Input/InputField';
import { Toggle } from '../Input/Toggle';
import {
    selectOttlePosting,
    updateForm,
} from '../../features/ottleMaker/ottlePostingSlice';

//#region styled-components
const Container = styled.div``;

const Label = styled.div`
    font-weight: 700;
    font-size: ${(props) => props.theme.font.p16};
`;
const Description = styled.div`
    color: ${(props) => props.theme.color.black_500};
    font-weight: 500;
    font-size: ${(props) => props.theme.font.p10};
`;
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${(props) => props.theme.gap.gap_16};
`;

const ConfigGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.gap.gap_16};
`;
//#endregion

export const OttleCreatePostingForm = () => {
    const { form } = useSelector(selectOttlePosting);
    const { title, saveAsImage, isPrivate } = form;
    const dispatch = useDispatch();

    const onChangeInput = (name) => (v) => {
        dispatch(updateForm({ ...form, [name]: v }));
    };
    const onChangeToggle = (name) => () => {
        dispatch(updateForm({ ...form, [name]: !form[name] }));
    };

    return (
        <Container className='pad'>
            <InputGroup>
                <h2>어떤 룩인가요?</h2>
                <InputField
                    value={title}
                    setValue={onChangeInput('title')}
                    placeholder='ex) 2022년 여름 바캉스룩'
                />
            </InputGroup>
            <br />
            {/*
            <InputGroup>
                <h2>설명 (선택사항)</h2>
                <TextArea
                    value={description}
                    placeholder='#해시태그 입력'
                    onChange={onChangeInput('description')}
                />
            </InputGroup>
            */}
            <ConfigGroup>
                <div>
                    <Label>사진 저장하기</Label>
                    <Description>사진을 기기에 저장합니다</Description>
                </div>
                <Toggle
                    value={saveAsImage}
                    toggle={onChangeToggle('saveAsImage')}
                ></Toggle>
            </ConfigGroup>
            <ConfigGroup>
                <div>
                    <Label>나만 보기</Label>
                    <Description>
                        내 프로필에 해당 게시물을 표시하지 않습니다
                    </Description>
                </div>
                <Toggle
                    value={isPrivate}
                    toggle={onChangeToggle('isPrivate')}
                ></Toggle>
            </ConfigGroup>
        </Container>
    );
};
