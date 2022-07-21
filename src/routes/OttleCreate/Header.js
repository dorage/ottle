import React from 'react';
import PropTypes from 'prop-types';
import { HeaderContainer } from '../../components/Layout/Header';
import { Textbutton } from '../../components/Button/TextButton';
import { GradientButton } from '../../components/Button/GradientButton';

export const OttleCreateHeader = ({ onCancle, onSubmit }) => {
    return (
        <HeaderContainer>
            <Textbutton onClick={onCancle}>취소</Textbutton>
            <GradientButton onClick={onSubmit}>Posting</GradientButton>
        </HeaderContainer>
    );
};
