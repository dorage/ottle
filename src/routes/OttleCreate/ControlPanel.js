import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '../../components/Button/IconButton';
import {
    CANVAS_ACTIONS,
    selectOttleAction,
    setAction,
} from '../../features/ottleMaker/ottleActionSlice';
import {
    TbRotate,
    TbArrowsMaximize,
    TbHandFinger,
    TbX,
    TbFoldUp,
    TbFoldDown,
} from 'react-icons/tb';
import { Slider } from '../../components/Input/Slider';
import {
    multipleToPercent,
    selectArtboard,
    updateMulitple,
} from '../../features/ottleMaker/artboardSlice';
import { HiSearch } from 'react-icons/hi';
import {
    bringFoward,
    releaseItem,
    sendBackward,
} from '../../features/ottleMaker/ottleItemSlice';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.color.black_400};
`;

export const ItemControlPanel = () => {
    const dispatch = useDispatch();
    const { action } = useSelector(selectOttleAction);

    return (
        <Container>
            <IconButton
                onClick={() => {
                    dispatch(bringFoward());
                }}
                icon={<TbFoldUp />}
            />
            <IconButton
                onClick={() => {
                    dispatch(sendBackward());
                }}
                icon={<TbFoldDown />}
            />
            <IconButton
                active={action === CANVAS_ACTIONS.MOVE}
                onClick={() => {
                    dispatch(setAction(CANVAS_ACTIONS.MOVE));
                }}
                icon={<TbHandFinger />}
            />
            <IconButton
                active={action === CANVAS_ACTIONS.SCALE}
                onClick={() => {
                    dispatch(setAction(CANVAS_ACTIONS.SCALE));
                }}
                icon={<TbArrowsMaximize />}
            />
            <IconButton
                active={action === CANVAS_ACTIONS.ROTATE}
                onClick={() => {
                    dispatch(setAction(CANVAS_ACTIONS.ROTATE));
                }}
                icon={<TbRotate />}
            />
            <IconButton
                onClick={() => {
                    dispatch(setAction(CANVAS_ACTIONS.IDLE));
                    dispatch(releaseItem());
                }}
                icon={<TbX />}
            />
        </Container>
    );
};

export const ArtboardControlPanel = () => {
    const dispatch = useDispatch();
    const { multiple } = useSelector(selectArtboard);

    return (
        <Container>
            <IconButton active={true} icon={<HiSearch />} />
            <Slider
                value={multipleToPercent(multiple)}
                onChange={(e) => {
                    dispatch(updateMulitple(e.currentTarget.value));
                }}
            />
        </Container>
    );
};
