import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region styled-components
const Container = styled.div`
    height: 100%;
    max-width: 150px;
    aspect-ratio: 1/1;
    margin: 0 auto;
    border-radius: 100%;
    background-color: ${(props) => props.theme.color.black_600};
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
`;
//#endregion

export const Portrait = ({ src }) => {
    return <Container src={src} />;
};
