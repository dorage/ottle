import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { IconButton } from '../../components/IconButton/IconButton';
import { Canvas } from './Canvas';
import { XIcon } from '@heroicons/react/outline';
import {
    onResizeArtboard,
    selectArtboard,
} from '../../features/ottleMaker/artboardSlice';
import {
    selectOttleItem,
    updateItem,
} from '../../features/ottleMaker/ottleItemSlice';
import {
    CANVAS_ACTIONS,
    selectOttleAction,
    setStartTouch,
    setMoveTouch,
} from '../../features/ottleMaker/ottleActionSlice';
import { angle, clamp, distance, getElementCenter } from '../../configs/utils';

//#region styled-components
const Container = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #eeeeee;
    // TODO; PC에서 안되네
    touch-action: none;
`;

const Header = styled.div`
    height: 5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    border-bottom: 1px solid ${(props) => props.theme.color.black_600};
    background-color: white;
`;
//#endregion

export const OttleMaker = () => {
    const dispatch = useDispatch();
    const { size: artboardSize } = useSelector(selectArtboard);
    const { selected, items } = useSelector(selectOttleItem);
    const {
        action,
        startTouch,
        moveTouch,
        movePivot,
        scalePivot,
        rotatePivot,
    } = useSelector(selectOttleAction);
    const selectedRef = useRef();

    useEffect(() => {
        // resize artboard
        dispatch(onResizeArtboard());
        window.addEventListener('resize', () => dispatch(onResizeArtboard()));
    }, []);

    // 이동을 구현
    const touchMove = () => {
        const { x: sx, y: sy } = startTouch;
        const { x: mx, y: my } = moveTouch;
        const { x: px, y: py } = movePivot;

        const dx = (mx - sx) / artboardSize; // - arboard size;
        const dy = (my - sy) / artboardSize; // - arboard size;

        const newItem = {
            ...items[selected],
            position: { x: clamp(px + dx, 0, 1), y: clamp(py + dy, 0, 1) },
        };

        dispatch(updateItem(newItem));
    };
    const touchScale = () => {
        const { x: sx, y: sy } = startTouch;
        const { x: mx, y: my } = moveTouch;
        const { x: px, y: py } = getElementCenter(selectedRef.current);

        const startDist = distance(sx, sy, px, py);
        const movedDist = distance(mx, my, px, py);
        const dist = (movedDist - startDist) / artboardSize;

        const scale = Math.max(scalePivot + dist, 0.1);

        const newItem = {
            ...items[selected],
            scale,
        };

        dispatch(updateItem(newItem));
    };
    const touchRotate = () => {
        const calcRotation = (px, py, sx, sy, mx, my) => {
            let rotation =
                (angle(px, py, mx, my) - angle(px, py, sx, sy) + rotatePivot) %
                1;
            if (rotation < 0) rotation += 1;
            return rotation;
        };
        const snap = (rotation) => {
            if (rotation < 0.01 || rotation > 0.99) {
                return 0;
            }
            if (rotation < 0.13 && rotation > 0.11) {
                return 0.125;
            }
            if (rotation < 0.26 && rotation > 0.24) {
                return 0.25;
            }
            if (rotation < 0.38 && rotation > 0.36) {
                return 0.375;
            }
            if (rotation < 0.51 && rotation > 0.49) {
                return 0.5;
            }
            if (rotation < 0.63 && rotation > 0.61) {
                return 0.625;
            }
            if (rotation < 0.76 && rotation > 0.74) {
                return 0.75;
            }
            if (rotation < 0.88 && rotation > 0.86) {
                return 0.875;
            }
            return rotation;
        };
        const { x: sx, y: sy } = startTouch;
        const { x: mx, y: my } = moveTouch;
        const { x: px, y: py } = getElementCenter(selectedRef.current);

        const rotation = snap(calcRotation(px, py, sx, sy, mx, my));
        console.log(rotation);

        const newItem = {
            ...items[selected],
            rotation,
        };

        dispatch(updateItem(newItem));
    };

    //#region event

    //#region  event-touch
    const onTouchStart = (e) => {
        dispatch(setStartTouch(e));
    };
    const onTouchMove = (e) => {
        if (action === CANVAS_ACTIONS.IDLE) return;
        dispatch(setMoveTouch(e));

        switch (action) {
            case CANVAS_ACTIONS.MOVE:
                touchMove();
                break;
            case CANVAS_ACTIONS.SCALE:
                touchScale();
                break;
            case CANVAS_ACTIONS.ROTATE:
                touchRotate();
                break;
        }
    };
    const onTouchEnd = (e) => {};
    const onTouchCancel = (e) => {};
    //#endregion
    //#endregion

    return (
        <Container
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
        >
            <Header>
                <IconButton icon={<XIcon />} />
            </Header>
            <Canvas selectedRef={selectedRef} />
        </Container>
    );
};
