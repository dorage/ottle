import React from 'react';
import PropTypes from 'prop-types';
import { TextButton } from '../Button/TextButton';
import { HeaderContainer } from '../Layout/Header';

export const OttleCreatePostingHeader = ({ onCancle }) => {
    return (
        <HeaderContainer className='pad'>
            <TextButton onClick={onCancle}>뒤로가기</TextButton>
        </HeaderContainer>
    );
};
