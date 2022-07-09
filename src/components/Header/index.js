import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ottle_black_512 from '../../assets/images/ottle_black_512.png';
import { GradientButton, LinkedGradientButton } from '../Button';
import { routes } from '../../configs/routes';

const Section = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;

    z-index: 99;
`;

const Logo = styled.img`
    height: 3.2rem;
`;

const CreateButton = styled.button`
    padding: 0.4rem 1.6rem;

    color: white;
    font-size: 1.4rem;
    font-weight: 700;

    border: none;
    border-radius: 2rem;
    background: rgb(132, 255, 201);
    background: linear-gradient(
        90deg,
        rgba(132, 255, 201, 1) 0%,
        rgba(170, 178, 255, 1) 50%,
        rgba(236, 160, 255, 1) 100%
    );
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
