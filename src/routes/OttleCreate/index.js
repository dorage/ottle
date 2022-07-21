import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Canvas } from './Canvas';
import { Inspector } from './Inspector';
import {
    onMoveArtboard,
    onResizeArtboard,
    selectArtboard,
    updatePosition,
} from '../../features/ottleMaker/artboardSlice';
import {
    itemHasSelected,
    selectOttleItem,
    updateItem,
} from '../../features/ottleMaker/ottleItemSlice';
import {
    CANVAS_ACTIONS,
    selectOttleAction,
    setStartTouch,
    setMoveTouch,
    releaseStartTouch,
    setAction,
} from '../../features/ottleMaker/ottleActionSlice';
import { angle, clamp, distance, getElementCenter } from '../../configs/utils';
import { OttleCreateHeader } from './Header';
import { openPosting } from '../../features/ottleMaker/ottlePostingSlice';
import { openModal } from '../../features/modal/modalSlice';
import { routes } from '../../configs/routes';
import { ALERTS, broadcastAlert } from '../../features/alert/alertSlice';
import { FullScreenContainer } from '../../components/Layout/Container';
import { theme } from '../../assets/styles/GlobalStyles';
import { OttleCreatePosting } from '../../components/OttleCreatePosting';
import { OttleCreateItemDrawer } from '../../components/OttleCreateItemDrawer';

//#region styled-components
//#endregion

export const OttleMaker = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const {
        size: artboardSize,
        position: artboardPosition,
        multiple: artboardMultiple,
        ratio: artboardRatio,
    } = useSelector(selectArtboard);
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
        window.addEventListener('beforeunload', (event) => {
            // 표준에 따라 기본 동작 방지
            event.preventDefault();
            // Chrome에서는 returnValue 설정이 필요함
            event.returnValue = '';
        });
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

        const newItem = {
            ...items[selected],
            rotation,
        };

        dispatch(updateItem(newItem));
    };
    // 아트보드 이동
    const touchArtboardMove = () => {
        dispatch(onMoveArtboard());
    };

    //#region event

    //#region  event-touch
    const onTouchStart = (e) => {
        dispatch(setStartTouch(e));
        if (!itemHasSelected(selected))
            dispatch(setAction(CANVAS_ACTIONS.ARTBOARD_MOVE));
    };
    const onTouchMove = (e) => {
        if (action === CANVAS_ACTIONS.IDLE || !startTouch) return;
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
            case CANVAS_ACTIONS.ARTBOARD_MOVE:
                touchArtboardMove();
                break;
        }
    };
    const onTouchEnd = (e) => {
        dispatch(releaseStartTouch());
    };
    const onTouchCancel = (e) => {
        dispatch(releaseStartTouch());
    };
    //#endregion
    //#endregion

    return (
        <FullScreenContainer
            zindex={theme.zindex.ottleCreate.normal}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
        >
            <OttleCreateHeader
                onCancle={() => {
                    dispatch(
                        openModal({
                            onYesAction: () => {
                                navigator(routes.main);
                            },
                        })
                    );
                }}
                onSubmit={() => {
                    // TODO; 나중에 지우기
                    if (items.length < 2) {
                        dispatch(broadcastAlert(ALERTS.ottleCreate.noItem));
                        return;
                    }
                    dispatch(openPosting());
                }}
            />
            <Canvas selectedRef={selectedRef} onTouchStart={onTouchStart} />
            <Inspector />
            <OttleCreateItemDrawer />
            <OttleCreatePosting />
        </FullScreenContainer>
    );
};
