import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '../../components/IconButton/IconButton';
import {
    CANVAS_ACTIONS,
    selectOttleAction,
    setAction,
} from '../../features/ottleMaker/ottleActionSlice';
import { TbRotate, TbArrowsMaximize, TbHandFinger, TbX } from 'react-icons/tb';

const Container = styled.div`
    text-align: center;
    border-bottom: 1px solid ${(props) => props.theme.color.black_400};
`;

export const ControlPanel = () => {
    const dispatch = useDispatch();
    const { action } = useSelector(selectOttleAction);

    return (
        <Container>
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
                }}
                icon={<TbX />}
            />
        </Container>
    );
};
