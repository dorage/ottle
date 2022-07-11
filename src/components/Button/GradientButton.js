import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LinkHoC } from '../HOC/LinkHoC';

export const GradientButton = styled.button`
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
export const LinkedGradientButton = LinkHoC(GradientButton);
