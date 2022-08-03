import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InputField } from '../Input/InputField';
import { TextArea } from '../Input/TextArea';
import { Toggle } from '../Input/Toggle';
import { updateForm } from '../../features/ottleMaker/ottlePostingSlice';

//#region styled-components
const Container = styled.div``;

const Label = styled.div`
    font-weight: 700;
    font-size: ${(props) => props.theme.font.p16};
`;
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;

const ConfigGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.gap.gap_16};
`;
//#endregion

export const OttleCreatePostingForm = ({ data }) => {
    const { title, description, saveAsImage } = data;
    const dispatch = useDispatch();

    const onChangeInput = (name) => (e) => {
        dispatch(updateForm({ ...data, [name]: e.currentTarget.value }));
    };
    const onChangeToggle = (name) => (e) => {
        dispatch(updateForm({ ...data, [name]: !data[name] }));
    };

    return (
        <Container className='pad'>
            <InputGroup>
                <h2>어떤 룩인가요?</h2>
                <InputField
                    value={title}
                    placeholder='ex) 2022년 여름 바캉스룩'
                    onChange={onChangeInput('title')}
                />
            </InputGroup>
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
                <Label>사진 저장하기</Label>
                <Toggle
                    value={saveAsImage}
                    toggle={onChangeToggle('saveAsImage')}
                ></Toggle>
            </ConfigGroup>
        </Container>
    );
};
