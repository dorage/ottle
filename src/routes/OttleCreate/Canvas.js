import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReceiptRefundIcon } from '@heroicons/react/outline';
import { Editable } from './Editable';
import { AB_HEIGHT, AB_WIDTH } from '../../configs/vars';

const [multipleMin, multipleMax] = [0.5, 2.5];

const getWidth = (ref) => {
    return ref.current.clientWidth;
};
const getHeight = (ref) => {
    return ref.current.clientHeight;
};

//#region styled-component
const CanvasSection = styled.section`
    position: relative;
    padding-top: 0.8rem;
    margin: 0;

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

export const Canvas = ({ items, setAction, selected }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [multiple, setMultiple] = useState(1.0);

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

    useEffect(() => {}, []);

    useEffect(() => {
        updateArtboardPosition();
    }, [x, y]);
    useEffect(() => {
        updateArtboardPosition();
        scaleArtboard();
    }, [multiple]);

    return (
        <div>
            <CanvasSection ref={canvasRef}>
                <Artboard
                    AB_WIDTH={AB_WIDTH}
                    AB_HEIGHT={AB_HEIGHT}
                    size={window.innerWidth - 32}
                    ref={artboardRef}
                >
                    {items ? (
                        items.map((item, idx) => (
                            <Editable
                                selected={idx === selected}
                                item={item}
                                setAction={setAction}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </Artboard>
            </CanvasSection>
        </div>
    );
};
