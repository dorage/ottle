import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectOttleItem } from '../../features/ottleMaker/ottleItemSlice';
import { ARTBOARD_SIZE } from '../../features/ottleMaker/artboardSlice';
import { selectOttlePosting } from '../../features/ottleMaker/ottlePostingSlice';

//#region styled-components
const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Canvas = styled.canvas`
    width: 60%;
    aspect-ratio: 1/1;
    border: 1px solid ${(props) => props.theme.color.black_600};
`;
//#endregion

export const OttleCreatePostingPreview = ({ canvasRef }) => {
    const { items } = useSelector(selectOttleItem);
    const { isOpend, form } = useSelector(selectOttlePosting);

    const loadImages = (itemArr) => {
        return itemArr.map((item) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = item.product.image.original;
                img.crossOrigin = 'Anonymous'; // html canvas toDataURL 오류
                img.onload = () => {
                    resolve({ item, img });
                };
            });
        });
    };

    const loadPreview = async () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 1080, 1080);

        const itemArr = [...items].reverse();
        const promises = loadImages(itemArr);
        const imgs = await Promise.all(promises);

        imgs.forEach(({ item, img }) => {
            const {
                position: { x, y },
                rotation,
                scale,
                size: { w, h },
            } = item;

            const dw = w * scale;
            const dh = h * scale;
            const dx = x * ARTBOARD_SIZE;
            const dy = y * ARTBOARD_SIZE;

            ctx.save();
            ctx.translate(dx, dy);
            ctx.rotate((Math.PI / 180) * (rotation * 360));
            ctx.drawImage(img, dw / -2, dh / -2, dw, dh);
            ctx.restore();
        });
    };

    useEffect(() => {
        loadPreview();
    }, [isOpend]);

    return (
        <Container>
            <Canvas width='1080px' height='1080px' ref={canvasRef} />
        </Container>
    );
};
