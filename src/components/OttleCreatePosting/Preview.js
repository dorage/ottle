import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectOttleItem } from '../../features/ottleMaker/ottleItemSlice';
import { ARTBOARD_SIZE } from '../../features/ottleMaker/artboardSlice';
import { selectOttlePosting } from '../../features/ottleMaker/ottlePostingSlice';
import { useParams } from 'react-router-dom';
import { getCtx, loadImage } from '../../configs/utils';

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
    const { username } = useParams();
    const { items } = useSelector(selectOttleItem);
    const { isOpend } = useSelector(selectOttlePosting);

    const loadItems = (itemArr) => {
        return itemArr.map((item) =>
            loadImage(item.product.image.original, (resolve, img) => {
                resolve({ item, img });
            })
        );
    };

    const drawImage = (ctx) => ({ item, img }) => {
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
    };

    const loadPreview = async () => {
        if (!canvasRef) return;
        const ctx = getCtx(canvasRef);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 1080, 1080);

        const itemArr = [...items].reverse();
        const promises = loadItems(itemArr);
        const imgs = await Promise.all(promises);

        imgs.forEach(drawImage(ctx));
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
