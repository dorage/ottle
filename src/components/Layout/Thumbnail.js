import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region styled-components
const Container = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
    margin: 0 auto;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
`;
//#endregion

export const Thumbnail = ({ src }) => {
    return <Container src={src} />;
};
