import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    HiOutlineViewBoards,
    HiOutlineHeart,
    HiOutlineClipboardList,
    HiOutlineUserCircle,
} from 'react-icons/hi';
import { IconButton, LinkedIconButton } from '../Button/IconButton';
import { routes } from '../../configs/routes';

const Section = styled.footer`
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 5rem;

    border-top: 1px solid #eeeeee;
    background-color: white;
    z-index: 99;
`;

const genPathObj = (path, icon) => ({ path, Icon: icon });

const paths = [
    genPathObj(routes.main, HiOutlineViewBoards),
    /*    genPathObj(routes.likes, HiOutlineHeart), 추후 업데이트 */
    /*    genPathObj(routes.boards, HiOutlineClipboardList), 추후 업데이트 */
    genPathObj(routes.profile, HiOutlineUserCircle),
];

export const Footer = ({ pathname }) => {
    return (
        <Section className='pad'>
            {paths.map(({ path, Icon }) =>
                pathname === path ? (
                    <IconButton active={true} icon={<Icon />} />
                ) : (
                    <LinkedIconButton to={path} icon={<Icon />} />
                )
            )}
        </Section>
    );
};
