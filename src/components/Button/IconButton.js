import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ExLinkHoC, LinkHoC } from '../HOC/LinkHoC';
import { LoadingBlock } from '../OttleCreateItemDrawer/LoadingItem';

const Button = styled.button`
    border: none;
    background-color: transparent;

    & > svg {
        width: ${(props) => `${props.w ? props.w / 10 : 2.8}rem`};
        height: ${(props) => `${props.h ? props.h / 10 : 2.8}rem`};
        color: ${(props) =>
            props.active
                ? props.activeColor || props.theme.color.black_200
                : props.normalColor || props.theme.color.black_400};
    }
    &:active {
        filter: ${(props) => (props.active ? 'none' : 'inherit')};
    }
`;

export const IconButton = ({
    loading,
    w,
    h,
    normalColor,
    activeColor,
    active,
    children,
    icon, // children 혹은 icon props를 통해 전달받음.
    onClick,
    ...props
}) => {
    return (
        <Button
            w={w}
            h={h}
            normalColor={normalColor}
            activeColor={activeColor}
            active={active}
            onClick={onClick}
            {...props}
        >
            {loading ? <LoadingBlock /> : children || icon}
        </Button>
    );
};

export const LinkedIconButton = LinkHoC(IconButton);

export const ExLinkedIconButton = ExLinkHoC(IconButton);
