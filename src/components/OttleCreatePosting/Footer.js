import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SemiRoundButton } from '../Button/RoundButton';
import { theme } from '../../assets/styles/GlobalStyles';
import { closePosting } from '../../features/ottleMaker/ottlePostingSlice';
import { GradientSemiRoundButton } from '../Button/GradientButton';
import { routes } from '../../configs/routes';
import { FooterContainer } from '../Layout/Footer';

//#region styled-components
const Container = styled(FooterContainer)`
    z-index: ${(props) => props.theme.zindex.ottleCreate.postingFooter};
`;
const Button = styled(SemiRoundButton)`
    padding: ${(props) => props.theme.gap.gap_8} 0;
    margin: 0 ${(props) => props.theme.gap.gap_4};
    &:first-child {
        margin-left: 0;
    }
`;
const SubmitButton = styled(GradientSemiRoundButton)`
    padding: ${(props) => props.theme.gap.gap_8} 0;
    margin-left: ${(props) => props.theme.gap.gap_4};
`;
//#endregion

export const OttleCreatePostingFooter = ({ onClickSave, onClickPublish }) => {
    return (
        <Container className='pad'>
            <Button
                className='flex-1'
                bg={theme.color.black_600}
                color={theme.color.black_300}
                onClick={onClickSave}
            >
                {'ㅤ'}
            </Button>
            <SubmitButton className='flex-1' onClick={onClickPublish}>
                게시하기
            </SubmitButton>
        </Container>
    );
};
