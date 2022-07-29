import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectArtboard } from '../../features/ottleMaker/artboardSlice';

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
`;

const Image = styled.div.attrs((props) => ({
    style: {
        width: `${props.width || undefined}px`,
        height: `${props.height || undefined}px`,
    },
}))`
    background-image: url(${(props) => props.imgSrc});
    background-size: cover;
    background-repeat: no-repeat;
`;

export const SelectRect = styled.div.attrs((props) => ({
    style: {
        position: 'absolute',
        left: `${props.currX || undefined}px`,
        top: `${props.currY || undefined}px`,
        transform:
            `scale(${props.currScale || 1})` +
            `rotate(${props.currRotation || 1}turn)`,
        width: `${props.width || undefined}px`,
        height: `${props.height || undefined}px`,
        border: `2px dashed ${props.theme.color.highlight}`,
        zIndex: props.theme.zindex.selectIndicator,
    },
}))``;

//#endregion

export const Editable = ({
    selectedRef,
    item: {
        position,
        size,
        scale,
        rotation,
        product: {
            name,
            image: { original },
        },
    },
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
            ref={selectedRef}
        >
            <Image
                imgSrc={original}
                width={getW()}
                height={getH()}
                alt={name}
            />
        </Rect>
    );
};

export const SelectIndicator = ({
    item: { position, size, scale, rotation },
}) => {
    const { size: artboardSize, ratio: artboardRatio } = useSelector(
        selectArtboard
    );
    const getW = () => size.w * artboardRatio;
    const getH = () => size.h * artboardRatio;
    const getX = () => artboardSize * position.x - getW() / 2;
    const getY = () => artboardSize * position.y - getH() / 2;

    return (
        <SelectRect
            width={getW()}
            height={getH()}
            currX={getX()}
            currY={getY()}
            currScale={scale}
            currRotation={rotation}
        />
    );
};
