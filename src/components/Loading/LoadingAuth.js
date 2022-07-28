import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FullScreenContainer } from '../Layout/Container';

//#region styled-components
const Container = styled.div``;
//#endregion

export const LoadingAuth = () => {
    return (
        <FullScreenContainer>
            <div>Ottle</div>
        </FullScreenContainer>
    );
};
