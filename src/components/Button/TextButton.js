import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LinkHoC } from '../HOC/LinkHoC';

export const Textbutton = styled.button`
    color: ${(props) => props.theme.color.black_400};
    font-size: 1.6rem;

    border: none;
    background: none;
`;
export const LinkedTextButton = LinkHoC(Textbutton);
