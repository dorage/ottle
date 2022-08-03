import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region styled-components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${(props) => props.theme.gap.gap_16};
`;
const Input = styled.input`
    border: none;
    border-bottom: 1px solid black;
    border-color: ${(props) =>
        props.error ? props.theme.color.error : props.theme.color.black_200};
    font-size: ${(props) => props.theme.font.p16};
    margin-bottom: ${(props) => props.theme.gap.gap_4};
    resize: none;

    &:focus {
        outline: none;
        background-color: ${(props) => props.theme.color.black_600};
    }
    &:read-only {
        color: ${(props) => props.theme.color.black_300};
        background-color: ${(props) => props.theme.color.black_600};
    }
`;

const Message = styled.div`
    color: ${(props) => props.theme.color.error};
`;
//#endregion

export const InputField = ({
    value,
    setValue,
    error,
    msg,
    blank,
    ...props
}) => {
    const onChangeInput = (e) => {
        console.log(e.key);
        setValue(e.currentTarget.value);
    };
    const onKeyDown = (e) => {
        if ((!blank && e.key === ' ') || !e.key.length) e.preventDefault();
    };

    return (
        <Container>
            <Input
                error={error}
                value={value}
                onKeyDown={onKeyDown}
                onChange={onChangeInput}
                {...props}
            />
            <Message error={error}>{error && msg}</Message>
        </Container>
    );
};
