import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FooterContainer } from '../../components/Layout/Footer';
import {
    HiOutlineViewBoards,
    HiOutlineHeart,
    HiOutlineClipboardList,
    HiOutlineUserCircle,
} from 'react-icons/hi';
import {
    IconButton,
    LinkedIconButton,
} from '../../components/Button/IconButton';
import { routes } from '../../configs/routes';

const Container = styled(FooterContainer)`
    justify-content: space-evenly;
`;

const genPathObj = (path, icon) => ({ path, Icon: icon });

const paths = [
    genPathObj(routes.main, HiOutlineViewBoards),
    /*    genPathObj(routes.likes, HiOutlineHeart), 추후 업데이트 */
    genPathObj(routes.boards, HiOutlineClipboardList),
    genPathObj(routes.profile, HiOutlineUserCircle),
];

export const HomeLayoutFooter = () => {
    const { pathname } = useLocation();

    return (
        <Container className='pad'>
            {paths.map(({ path, Icon }) =>
                pathname === path ? (
                    <IconButton active={true} icon={<Icon />} />
                ) : (
                    <LinkedIconButton to={path} icon={<Icon />} />
                )
            )}
        </Container>
    );
};
