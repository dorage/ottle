import React from 'react';
import PropTypes from 'prop-types';
import { HeaderContainer } from '../../components/Layout/Header';
import { TextButton } from '../../components/Button/TextButton';
import { GradientButton } from '../../components/Button/GradientButton';

export const OttleCreateHeader = ({ onCancle, onSubmit }) => {
    return (
        <HeaderContainer>
            <TextButton onClick={onCancle}>취소</TextButton>
            <GradientButton onClick={onSubmit}>Posting</GradientButton>
        </HeaderContainer>
    );
};
