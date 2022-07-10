import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { selectArtboard } from '../../features/ottleMaker/artboardSlice';
import { CANVAS_ACTIONS } from '../../features/ottleMaker/ottleActionSlice';

//#region styled-component

const Rect = styled.div.attrs((props) => ({
    style: {
        position: 'absolute',
        left: `${props.currX || undefined}px`,
        top: `${props.currY || undefined}px`,
        transform:
            `scale(${props.currScale || 1})` +
            `rotate(${props.currRotation || 1}turn)`,
    },
}))`
    & > img {
        user-select: none;
    }
    border: 2px dashed;
`;

const Image = styled.div.attrs((props) => ({
    style: {
        width: `${props.width || undefined}px`,
        height: `${props.height || undefined}px`,
    },
}))`
    background-image: url(${(props) => props.imgSrc});
`;

//#endregion

export const Editable = ({
    selected,
    selectedRef,
    item: { name, src, position, size, scale, rotation },
}) => {
    const { size: artboardSize, ratio: artboardRatio } = useSelector(
        selectArtboard
    );

    const getW = () => size.w * artboardRatio;
    const getH = () => size.h * artboardRatio;
    const getX = () => artboardSize * position.x - getW() / 2;
    const getY = () => artboardSize * position.y - getH() / 2;

    return (
        <Rect
            currX={getX()}
            currY={getY()}
            currScale={scale}
            currRotation={rotation}
            selected={selected}
            ref={selectedRef}
        >
            <Image
                id={selected && CANVAS_ACTIONS.MOVE}
                imgSrc={src}
                width={getW()}
                height={getH()}
                alt={name}
            ></Image>
        </Rect>
    );
};
