import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region styled-components
export const InputField = styled.input`
    border: none;
    border-bottom: 1px solid black;
    font-size: ${(props) => props.theme.font.p16};
    resize: none;
    margin-bottom: ${(props) => props.theme.gap.gap_16};

    &:focus {
        outline: none;
        background-color: ${(props) => props.theme.color.black_600};
    }
`;
//#endregion
