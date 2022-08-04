import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { OttleCreatePostingHeader } from './Header';
import { FullScreenContainer } from '../Layout/Container';
import {
    closePosting,
    selectOttlePosting,
} from '../../features/ottleMaker/ottlePostingSlice';
import { theme } from '../../assets/styles/GlobalStyles';
import { OttleCreatePostingForm } from './Form';
import { OttleCreatePostingFooter } from './Footer';
import { OttleCreatePostingPreview } from './Preview';
import { routes } from '../../configs/routes';
import { selectUser } from '../../features/user/userSlice';
import { setOttleDoc } from '../../app/firestore';
import { selectOttleItem } from '../../features/ottleMaker/ottleItemSlice';
import watermark from '../../assets/images/ottle_logo_watermark.png';
import { ARTBOARD_SIZE } from '../../features/ottleMaker/artboardSlice';
import { getCtx, loadImage } from '../../configs/utils';
import { logEventFirebase } from '../../app/analytics';

//#region styled-components
const Container = styled(FullScreenContainer)`
    transform: translateX(100vw);
    transition: 0.3s;
    &.posting-opend {
        transform: translateX(0);
    }
`;
const ScrollRect = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${(props) => props.theme.gap.gap_32} 0;
    overflow-y: scroll;
`;
//#endregion

export const OttleCreatePosting = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const canvasRef = useRef();

    const [saving, setSaving] = useState(false);
    const { isOpend, form } = useSelector(selectOttlePosting);
    const { items } = useSelector(selectOttleItem);
    const { user } = useSelector(selectUser);

    const onClickSave = () => {
        if (process.env.NODE_ENV === 'development') navigator(routes.main());
    };

    const drawWatermark = async () => {
        const ctx = getCtx(canvasRef);
        const img = await loadImage(watermark, (resolve, img) => resolve(img));
        ctx.save();
        ctx.drawImage(
            img,
            ARTBOARD_SIZE - img.width - 16,
            ARTBOARD_SIZE - img.height - 16,
            img.width,
            img.height
        );
        ctx.restore();
    };

    const onClickPublish = async () => {
        if (saving) return;
        setSaving(true);
        const { title, description, nanoid } = form;

        // 이미지 DB에 저장
        await new Promise((resolve) => {
            canvasRef.current.toBlob(
                async (blob) => {
                    await setOttleDoc(user.uid, blob, {
                        title,
                        description,
                        items,
                        nanoid,
                    });
                    resolve();
                },
                'image/webp',
                1
            );
        });

        await drawWatermark();
        const link = document.createElement('a');
        link.download = `download_${Number(new Date())}.webp`;
        link.href = canvasRef.current.toDataURL();
        link.click();
        link.remove();

        logEventFirebase('post_new_ottle');
        navigator(routes.main());
    };

    return (
        <Container
            zindex={theme.zindex.ottleCreate.posting}
            className={isOpend && 'posting-opend'}
        >
            <OttleCreatePostingHeader
                onCancle={() => dispatch(closePosting())}
            />
            <OttleCreatePostingPreview canvasRef={canvasRef} />
            <ScrollRect className='pad flex-1'>
                <OttleCreatePostingForm data={form} />
            </ScrollRect>
            <OttleCreatePostingFooter
                onClickSave={onClickSave}
                onClickPublish={onClickPublish}
            />
        </Container>
    );
};
