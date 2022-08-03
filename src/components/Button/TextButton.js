import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LinkHoC } from '../HOC/LinkHoC';

export const Textbutton = styled.button`
    color: ${(props) => props.theme.color.black_400};
    font-size: ${(props) => props.fontSize || props.theme.font.p16};

    border: none;
    background: none;
`;

export const LinkedTextButton = LinkHoC(Textbutton);
