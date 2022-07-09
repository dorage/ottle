import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Slide,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import {
    AB_HEIGHT,
    AB_WIDTH,
    RENDERER_HEIGHT,
    RENDERER_WIDTH,
} from '../../configs/vars';

const Renderer = styled.canvas`
    width: 300px;
    height: 300px;
    border: 2px solid red;
`;

export const ControlPanel = ({
    artboardRef,
    setMultiple,
    setX,
    setY,
    items,
}) => {
    const canvasRef = useRef();
    const scaleIndex = (val, min, max) => {
        if (min > max) return null;
        return val / (100 / (max - min)) + min;
    };

    useEffect(() => {}, [canvasRef]);

    //#region Event

    const onChangeMultiply = (val) => {
        setMultiple(scaleIndex(val, 0.5, 2.5));
    };
    const onChangeXPos = (val) => {
        setX(scaleIndex(val, -1, 1));
    };
    const onChangeYPos = (val) => {
        setY(scaleIndex(val, -1, 1));
    };
    const onClickCapture = async () => {
        //const canvas = await html2canvas(artboardRef.current);
        //document.body.appendChild(canvas);

        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        const [rw, rh] = [RENDERER_WIDTH, RENDERER_HEIGHT];
        const [aw, ah] = [AB_WIDTH, AB_HEIGHT];
        ctx.clearRect(0, 0, rw, rh);
        for (const {
            src,
            position: { x, y },
            rotation,
            scale,
            size: { w, h },
        } of items) {
            // draw
            const dw = (rw / aw) * w * scale;
            const dh = (rh / ah) * h * scale;
            const dx = rw * x;
            const dy = rh * y;

            const img = new Image();
            img.src = src;
            img.onload = () => {
                ctx.save();
                ctx.translate(dx, dy);
                ctx.rotate((Math.PI / 180) * (rotation * 360));
                ctx.drawImage(img, dw / -2, dh / -2, dw, dh);
                ctx.restore();
            };
        }
    };

    //#endregion

    return (
        <>
            <div>
                <label>artboard size</label>
                <Slider
                    aria-label='slider-ex-3'
                    defaultValue={25}
                    orientation='horizontal'
                    minW='32'
                    onChange={onChangeMultiply}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </div>
            <div>
                <label>X</label>
                <Slider
                    aria-label='slider-ex-3'
                    defaultValue={50}
                    orientation='horizontal'
                    minW='32'
                    onChange={onChangeXPos}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </div>
            <div>
                <label>Y</label>
                <Slider
                    aria-label='slider-ex-3'
                    defaultValue={50}
                    orientation='horizontal'
                    minW='32'
                    onChange={onChangeYPos}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </div>
            <div>
                <Button>Add Product</Button>
                <Button>Add Sticker</Button>
                <Button onClick={onClickCapture}>Download Image</Button>
            </div>
            <div>
                <Renderer
                    id='canvas'
                    width={`${RENDERER_WIDTH}px`}
                    height={`${RENDERER_HEIGHT}px`}
                    ref={canvasRef}
                ></Renderer>
            </div>
        </>
    );
};
