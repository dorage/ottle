import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ottle_black_512 from '../../assets/images/ottle_black_512.png';
import { GradientButton, LinkedGradientButton, Textbutton } from '../Button';
import { routes } from '../../configs/routes';

const Section = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;

    background-color: white;
    z-index: 99;
`;

const Logo = styled.img`
    height: 3.2rem;
`;

export const Header = () => {
    return (
        <Section>
            <Logo src={ottle_black_512} />
            <LinkedGradientButton to={routes.ottleCreate}>
                Create
            </LinkedGradientButton>
        </Section>
    );
};

export const OttleCreateHeader = () => (
    <Section className='pad'>
        <Textbutton>취소</Textbutton>
        <GradientButton>Posting</GradientButton>
    </Section>
);
