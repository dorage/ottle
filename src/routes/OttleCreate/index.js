import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { IconButton } from '../../components/IconButton/IconButton';
import { CANVAS_ACTIONS } from '../../configs/vars';
import { Canvas } from './Canvas';
import { XIcon } from '@heroicons/react/outline';
import {
    onResizeArtboard,
    selectArtboard,
    updateScreenSize,
} from '../../features/ottleMaker/artboardSlice';
import { theme } from '../../assets/styles/GlobalStyles';
import { selectOttleMaker } from '../../features/ottleMaker/ottleMakerSlice';

//#region styled-components
const APP = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #eeeeee;
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

const distance = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
const clamp = (val, min, max) => Math.max(Math.min(val, max), min);
const getElementCenter = (elem) => {
    const { left, top, width, height } = elem.getBoundingClientRect();
    return [left + width / 2, top + height / 2];
};
const getRotation = (pivotX, pivotY, currX, currY) => {
    const radians = Math.atan2(currY - pivotY, currX - pivotX);
    const degree = radians * (180 / Math.PI) + 180;
    return degree / 360;
};

export const OttleMaker = () => {
    const dispatch = useDispatch();
    const { size: artboardSize } = useSelector(selectArtboard);
    const { selected, items } = useSelector(selectOttleMaker);

    const [action, setAction] = useState(CANVAS_ACTIONS.IDLE);
    const [startPointer, setStartPointer] = useState([0, 0]);
    const [movePivot, setMovePivot] = useState([0, 0]);
    const [rotatePivot, setRotatePivot] = useState(0);
    const [scalePivot, setScalePivot] = useState(0);

    useEffect(() => {
        dispatch(onResizeArtboard());
        window.addEventListener('resize', () => dispatch(onResizeArtboard()));
    }, []);

    /**
     * 마우스가 다운되었을 때 기록된 startPointer[clientX, clientY]를 기준으로
     * 현재의 clientX, clientY를 통해 차이를 구하고
     * 시작포인트에 합산해서 item을 업데이트한다.
     * @param {*} x 현재 clientX
     * @param {*} y 현재 clientY
     */
    const move = (x, y) => {
        const [sx, sy] = startPointer;
        const [px, py] = movePivot;
        const dx = (x - sx) / artboardSize;
        const dy = (y - sy) / artboardSize;

        const position = {
            x: clamp(px + dx, 0, 1),
            y: clamp(py + dy, 0, 1),
        };

        const item = {
            ...items[selected],
            position,
        };

        //setItems([item]);
    };
    /**
     * 마우스가 다운되었을 때 기록된 startPointer[clientX, clientY]를 기준으로
     * 현재의 clientX, clientY 좌표와의 거리를 구하고
     * 기존 item의 scale값에 합산해서 item을 업데이트한다.
     * @param {*} x 현재 clientX
     * @param {*} y 현재 clientY
     */
    const scale = (x, y) => {
        const [sx, sy] = startPointer;
        const p = scalePivot;
        const sign = x > sx && y > sy ? -1 : 1;
        const dist = clamp(
            (sign * distance(sx, sy, x, y)) / artboardSize,
            -1,
            10
        );
        const scale = Math.max(p + dist, 0.1);

        const item = {
            ...items[selected],
            scale,
        };
        //setItems([item]);
    };
    /**
     *
     * @param {*} x 현재 clientX
     * @param {*} y 현재 clientY
     */
    const rotate = (x, y) => {
        const [sx, sy] = startPointer;
        const [px, py] = rotatePivot;

        const rotation =
            getRotation(px, py, x, y) - getRotation(px, py, sx, sy);

        const item = { ...items[selected], rotation };
        //setItems([item]);
    };

    //#region event
    const onMouseDown = (e) => {
        setStartPointer([e.clientX, e.clientY]);
        switch (e.target.id) {
            case CANVAS_ACTIONS.SCALE:
                setAction(CANVAS_ACTIONS.SCALE);
                setScalePivot(items[selected].scale);
                break;
            case CANVAS_ACTIONS.DELETE:
                setAction(CANVAS_ACTIONS.DELETE);
                break;
            case CANVAS_ACTIONS.ROTATE:
                setAction(CANVAS_ACTIONS.ROTATE);
                setRotatePivot(getElementCenter(e.target.parentElement));
                break;
            case CANVAS_ACTIONS.MOVE:
                setAction(CANVAS_ACTIONS.MOVE);
                setMovePivot([
                    items[selected].position.x,
                    items[selected].position.y,
                ]);
                break;
            default:
                setAction(CANVAS_ACTIONS.IDLE);
                break;
        }
    };

    const onMouseMove = (e) => {
        switch (action) {
            case CANVAS_ACTIONS.MOVE:
                move(e.clientX, e.clientY);
                break;
            case CANVAS_ACTIONS.SCALE:
                scale(e.clientX, e.clientY);
                break;
            case CANVAS_ACTIONS.DELETE:
                console.log(CANVAS_ACTIONS.DELETE);
                break;
            case CANVAS_ACTIONS.ROTATE:
                rotate(e.clientX, e.clientY, e.target);
                break;
            default:
                console.log(action);
                return;
        }
    };
    const onMouseUp = (e) => {
        setAction(CANVAS_ACTIONS.IDLE);
    };
    //#endregion

    return (
        <APP
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        >
            <Header>
                <IconButton icon={<XIcon />} />
            </Header>
            <Canvas />
        </APP>
    );
};
