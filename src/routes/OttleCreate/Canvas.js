import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Editable } from './Editable';
import { selectArtboard } from '../../features/ottleMaker/artboardSlice';
import { selectOttleItem } from '../../features/ottleMaker/ottleItemSlice';

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

const Artboard = styled.div`
    position: relative;
    width: ${(props) => props.size || 100}px;
    height: ${(props) => props.size || 100}px;
    margin: 0 auto;

    overflow: hidden;
    background-color: white;

    z-index: 2;
`;

//#endregion

export const Canvas = ({ selectedRef }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [multiple, setMultiple] = useState(1.0);

    const { size: artboardSize } = useSelector(selectArtboard);
    const { selected, items } = useSelector(selectOttleItem);

    const canvasRef = useRef();
    const artboardRef = useRef();

    const updateArtboardPosition = () => {
        const xDiff = multiple * getWidth(artboardRef) - getWidth(canvasRef);
        const yDiff = multiple * getHeight(artboardRef) - getHeight(canvasRef);

        const left = xDiff <= 0 ? 1 : 0.5 * xDiff * x;
        const top = yDiff <= 0 ? 1 : 0.5 * yDiff * y;

        artboardRef.current.style.left = `${left}px`;
        artboardRef.current.style.top = `${top}px`;
    };

    const scaleArtboard = () => {
        artboardRef.current.style.transform = `scale(${multiple}, ${multiple})`;
    };

    useEffect(() => {
        document.addEventListener('resize', () => {
            //
        });
    }, []);

    useEffect(() => {
        updateArtboardPosition();
    }, [x, y]);
    useEffect(() => {
        updateArtboardPosition();
        scaleArtboard();
    }, [multiple]);

    return (
        <Container ref={canvasRef}>
            <Artboard size={artboardSize} ref={artboardRef}>
                {items ? (
                    items.map((item, idx) => (
                        <Editable
                            key={item.id}
                            selected={selected === idx}
                            selectedRef={selectedRef}
                            item={item}
                        />
                    ))
                ) : (
                    <></>
                )}
            </Artboard>
        </Container>
    );
};
