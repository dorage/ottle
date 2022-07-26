import React, { useEffect, useRef, useState } from 'react';
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
import { uploadOttleImage } from '../../app/storage';
import { selectUser } from '../../features/user/userSlice';
import { setOttleDoc } from '../../app/firestore';

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

    const { isOpend, form } = useSelector(selectOttlePosting);
    const { user } = useSelector(selectUser);

    const onClickSave = () => {
        if (process.env.NODE_ENV === 'development') navigator(routes.main);
    };

    const onClickPublish = () => {
        const { title, description } = form;
        if (!title.length) return;

        const link = document.createElement('a');
        link.download = `download_${Number(new Date())}.webp`;
        link.href = canvasRef.current.toDataURL();
        canvasRef.current.toBlob(
            (blob) =>
                setOttleDoc(user.uid, blob, {
                    title,
                    description,
                }),
            'image/webp',
            1
        );
        link.click();
        link.remove();

        navigator(routes.main);
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
