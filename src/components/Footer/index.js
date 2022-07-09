import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    ViewBoardsIcon,
    HeartIcon,
    ClipboardListIcon,
    UserCircleIcon,
} from '@heroicons/react/outline';
import { IconButton, IconLink } from '../IconButton/IconButton';
import { routes } from '../../configs/routes';

const Section = styled.footer`
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;

    border-top: 1px solid #eeeeee;
    background-color: white;
    z-index: 99;
`;

const genPathObj = (path, icon) => ({ path, Icon: icon });

const paths = [
    genPathObj(routes.main, ViewBoardsIcon),
    genPathObj(routes.likes, HeartIcon),
    genPathObj(routes.boards, ClipboardListIcon),
    genPathObj(routes.profile, UserCircleIcon),
];

export const Footer = ({ pathname }) => {
    return (
        <Section className='pad'>
            {paths.map(({ path, Icon }) =>
                pathname === path ? (
                    <IconButton active={true} icon={<Icon />} />
                ) : (
                    <IconLink to={path} icon={<Icon />} />
                )
            )}
        </Section>
    );
};
