import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AB_HEIGHT, AB_WIDTH, CANVAS_ACTIONS } from '../../configs/vars';

const Rect = styled.div`
    position: absolute;
    left: ${(props) => `${props.currX}px`};
    top: ${(props) => `${props.currY}px`};
    & > img {
        user-select: none;
    }
    transform: scale(${(props) => props.currScale})
        rotate(${(props) => `${props.currRotation}turn`});
    border: 1px solid gray;
`;

const Button = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;

    background-color: gray;
    border-radius: 1rem;
    cursor: pointer;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;

    transform: scale(${(props) => 1 / props.currScale});

    &.action-toggle-lt {
        left: -1rem;
        top: -1rem;
    }
    &.action-toggle-rt {
        right: -1rem;
        top: -1rem;
    }
    &.action-toggle-lb {
        left: -1rem;
        bottom: -1rem;
    }
    &.action-toggle-rb {
        right: -1rem;
        bottom: -1rem;
    }
    &.action-toggle-c {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const Image = styled.div`
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};
    background-image: url(${(props) => props.imgSrc});
    ${(props) => (props.selected ? 'cursor: pointer;' : '')}
`;

export const Editable = ({
    item: { src, position, size, scale, rotation },
    selected,
    editableRef,
    setAction,
}) => {
    useEffect(() => {}, []);
    return (
        <Rect
            currX={AB_WIDTH * position.x - size.w / 2}
            currY={AB_HEIGHT * position.y - size.h / 2}
            currScale={scale}
            currRotation={rotation}
        >
            {selected && (
                <>
                    <Button
                        id={CANVAS_ACTIONS.SCALE}
                        className='action-toggle action-toggle-lt'
                        currScale={scale}
                    >
                        Scale
                    </Button>
                    <Button
                        id={CANVAS_ACTIONS.DELETE}
                        className='action-toggle action-toggle-rt'
                        currScale={scale}
                    >
                        Delete
                    </Button>
                    <Button
                        id={CANVAS_ACTIONS.ROTATE}
                        className='action-toggle action-toggle-lb'
                        currScale={scale}
                    >
                        Rotate
                    </Button>
                    <Button
                        id={CANVAS_ACTIONS.MOVE}
                        className='action-toggle action-toggle-rb'
                        currScale={scale}
                    >
                        Position
                    </Button>
                </>
            )}
            <Image
                id={selected && CANVAS_ACTIONS.MOVE}
                selected={selected}
                imgSrc={src}
                width={size.w}
                height={size.h}
                alt='hello'
            ></Image>
        </Rect>
    );
};
