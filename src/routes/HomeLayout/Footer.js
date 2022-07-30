import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
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
import { getOriginUrl, routes } from '../../configs/routes';
import { selectUser } from '../../features/user/userSlice';
import { selectScreen } from '../../features/screen/screenSlice';

const Container = styled(FooterContainer)`
    justify-content: space-evenly;
    z-index: ${(props) => props.theme.zindex.footer};
`;

const FooterIcon = ({ route, active, icon }) => {
    return active ? (
        <IconButton active={true} icon={icon} />
    ) : (
        <LinkedIconButton to={route()} icon={icon} />
    );
};

export const HomeLayoutFooter = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const [active, setActive] = useState(0);
    const { w, h } = useSelector(selectScreen);

    useEffect(() => {
        switch (getOriginUrl(params, pathname)) {
            case routes.main():
                setActive(0);
                break;
            case routes.profile():
                setActive(1);
                break;
            case routes.user():
                setActive(1);
                break;
        }
    }, [pathname]);

    return (
        <Container className='pad'>
            <FooterIcon
                active={active === 0}
                route={routes.main}
                icon={<HiOutlineViewBoards />}
            />
            <FooterIcon
                active={active === 1}
                route={routes.profile}
                icon={<HiOutlineUserCircle />}
            />
        </Container>
    );
};
