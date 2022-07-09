import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ottle_black_512 from '../../assets/images/ottle_black_512.png';
import {
    ViewBoardsIcon,
    HeartIcon,
    ClipboardListIcon,
    UserCircleIcon,
} from '@heroicons/react/outline';
import { OttleCreate } from '../OttleCreate';

const Section = styled.section`
    padding: 0 1.6rem;
`;
const Article = styled.article`
    padding: 0 1.6rem;
`;
const Head = styled.h1`
    font-size: 2.4rem;
`;

const Header = styled(Section)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;

    z-index: 99;
`;

const Logo = styled.img`
    height: 3.2rem;
`;

const CreateButton = styled.button`
    padding: 0.4rem 1.6rem;

    color: white;
    font-size: 1.4rem;
    font-weight: 700;

    border: none;
    border-radius: 2rem;
    background: rgb(132, 255, 201);
    background: linear-gradient(
        90deg,
        rgba(132, 255, 201, 1) 0%,
        rgba(170, 178, 255, 1) 50%,
        rgba(236, 160, 255, 1) 100%
    );

    &:active {
        filter: blur(0.3rem);
        transition: 0.3s;
    }
`;

const Footer = styled.footer`
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    padding: 0 1.6rem;

    border-top: 1px solid #eeeeee;
    background-color: white;
    z-index: 99;
`;

const IconButton = styled.button`
    border: none;
    background-color: transparent;

    & > svg {
        width: 3.2rem;
        height: 3.2rem;
        color: #999999;
    }
    &.selected > svg {
        color: #333333;
    }

    &:active {
        filter: blur(0.3rem);
        transition: 0.3s;
    }
    &.selected:active {
        filter: none;
    }
`;

export const Main = () => {
    return (
        <div>
            <Header>
                <Logo src={ottle_black_512} />
                <CreateButton>Create</CreateButton>
            </Header>
            <Section>
                <Head>Events</Head>
                <Article>Hello, it is the article of Trends.</Article>
            </Section>
            <Section>
                <Head>Trends</Head>
                <Article>Hello, it is the article of Trends.</Article>
            </Section>
            <Section>
                <Head>Following</Head>
                <Article>Hello, it is the article of Following.</Article>
            </Section>
            <Footer>
                <IconButton className='selected'>
                    <ViewBoardsIcon />
                </IconButton>
                <IconButton>
                    <HeartIcon />
                </IconButton>
                <IconButton>
                    <ClipboardListIcon />
                </IconButton>
                <IconButton>
                    <UserCircleIcon />
                </IconButton>
            </Footer>
        </div>
    );
};
