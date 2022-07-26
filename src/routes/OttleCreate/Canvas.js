import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Editable, SelectIndicator } from './Editable';
import { selectArtboard } from '../../features/ottleMaker/artboardSlice';
import {
    itemHasSelected,
    selectOttleItem,
} from '../../features/ottleMaker/ottleItemSlice';

const [multipleMin, multipleMax] = [0.5, 2.5];

const getWidth = (ref) => {
    return ref.current.clientWidth;
};
const getHeight = (ref) => {
    return ref.current.clientHeight;
};

//#region styled-component
const Container = styled.section`
    position: relative;
    margin: 0.4rem 0;

    overflow: hidden;
    background-color: #eeeeee;

    z-index: 1;
`;

const Artboard = styled.div.attrs((props) => ({
    style: {
        width: `${props.size || 100}px`,
        height: `${props.size || 100}px`,
        left: `${props.x || 0}px`,
        top: `${props.y || 0}px`,
        transform: `scale(${props.multiple}, ${props.multiple})`,
    },
}))`
    position: relative;
    margin: 0 auto;

    overflow: hidden;
    background-color: white;

    z-index: 2;
`;

//#endregion

export const Canvas = ({ selectedRef, onTouchStart }) => {
    const {
        size: artboardSize,
        multiple,
        position: { x, y },
    } = useSelector(selectArtboard);
    const { selected, items } = useSelector(selectOttleItem);

    const canvasRef = useRef();
    const artboardRef = useRef();

    const updateArtboardPosition = () => {
        const xDiff = multiple * getWidth(artboardRef) - getWidth(canvasRef);
        const yDiff = multiple * getHeight(artboardRef) - getHeight(canvasRef);

        const left = xDiff <= 0 ? 0 : 0.5 * xDiff * x;
        const top = yDiff <= 0 ? 0 : 0.5 * yDiff * y;

        artboardRef.current.style.left = `${left}px`;
        artboardRef.current.style.top = `${top}px`;
    };
    const getX = () => {};
    const getY = () => {};
    useEffect(() => {
        // updateArtboardPosition();
    }, [x, y]);

    return (
        <Container ref={canvasRef}>
            <Artboard
                size={artboardSize}
                ref={artboardRef}
                onTouchStart={onTouchStart}
                multiple={multiple}
                x={x}
                y={y}
            >
                {items ? (
                    <>
                        {[...items].reverse().map((item, idx) => (
                            <Editable
                                key={idx}
                                selected={selected === idx}
                                selectedRef={selectedRef}
                                item={item}
                            />
                        ))}
                        {itemHasSelected(selected) && (
                            <SelectIndicator item={items[selected]} />
                        )}
                    </>
                ) : (
                    <></>
                )}
            </Artboard>
        </Container>
    );
};
