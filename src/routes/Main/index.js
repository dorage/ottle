import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmailSignIn } from '../../components/devs/EmailSignIn';

export const Main = () => {
    return (
        <>
            <EmailSignIn />
            <section className='section'>
                <h1>Events</h1>
                <article className='section'>
                    Hello, it is the article of Trends.
                </article>
            </section>
            <section className='section'>
                <h1>Trends</h1>
                <article className='section'>
                    Hello, it is the article of Trends.
                </article>
            </section>
            <section className='section'>
                <h1>Following</h1>
                <article className='section'>
                    Hello, it is the article of Following.
                </article>
            </section>
        </>
    );
};
