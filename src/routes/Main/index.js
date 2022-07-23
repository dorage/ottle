import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmailSignIn } from '../../components/devs/EmailSignIn';
import { MainThread } from './MainThread';

export const Main = () => {
    return (
        <>
            <EmailSignIn />
            <MainThread />
        </>
    );
};
