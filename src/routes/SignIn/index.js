import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmailSignIn } from '../../components/devs/EmailSignIn';

//#region styled-components
const Container = styled.div``;
//#endregion

export const SignIn = () => {
    return (
        <Container>
            <EmailSignIn />
        </Container>
    );
};
