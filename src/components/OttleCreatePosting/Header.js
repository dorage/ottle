import React from 'react';
import PropTypes from 'prop-types';
import { Textbutton } from '../Button/TextButton';
import { HeaderContainer } from '../Layout/Header';

export const OttleCreatePostingHeader = ({ onCancle }) => {
    return (
        <HeaderContainer className='pad'>
            <Textbutton onClick={onCancle}>뒤로가기</Textbutton>
        </HeaderContainer>
    );
};
