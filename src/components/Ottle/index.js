import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region styled-components
const Container = styled.div``;
//#endregion

export const Ottle = ({ data }) => {
    return (
        <Container className='pad'>
            <div>썸네일</div>
            <div></div>
        </Container>
    );
};
