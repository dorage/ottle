import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region styled-components
//const Container = styled.input.attrs((props) => ({ type: 'checkbox' }))`
const Container = styled.div.attrs((props) => ({
    style: {
        backgroundColor: props.value
            ? props.theme.color.highlight
            : props.theme.color.black_600,
    },
}))`
    width: ${(props) => `${props.width}rem`};
    aspect-ratio: 2/1;
    background: none;
    border: 1px solid ${(props) => props.theme.color.black_500};
    border-radius: 5rem;

    &.on > div {
        transform: translateX(
            ${(props) => `${props.width - props.width / 2}rem`}
        );
    }
`;
const Ball = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
    border: 1px solid ${(props) => props.theme.color.black_500};
    border-radius: 100%;
    background-color: white;
    transition: 0.1s linear;
`;

//#endregion

export const Toggle = ({ width, value, toggle }) => {
    return (
        <Container
            width={width || 5}
            className={value && 'on'}
            value={value}
            onClick={() => toggle()}
        >
            <Ball />
        </Container>
    );
};
