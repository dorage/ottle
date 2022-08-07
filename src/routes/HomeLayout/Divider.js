import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region styled-components
const Container = styled.div`
    margin-bottom: ${(props) => props.theme.gap.gap_32};
    & > hr {
        color: ${(props) => props.theme.color.black_600};
    }
`;
//#endregion

export const Divider = (props) => {
    return (
        <Container {...props}>
            <hr />
        </Container>
    );
};
