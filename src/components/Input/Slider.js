import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region styled-components
const SliderInput = styled.input.attrs((props) => ({
    type: 'range',
    min: 0,
    max: 100,
    value: props.value,
}))``;
//#endregion

export const Slider = (props) => {
    return <SliderInput {...props} />;
};
