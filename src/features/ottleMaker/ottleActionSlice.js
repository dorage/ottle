import { createSlice } from '@reduxjs/toolkit';
import { clamp } from '../../configs/utils';
import { selectArtboard } from './artboardSlice';
import { selectOttleItem, updateItem } from './ottleItemSlice';

export const CANVAS_ACTIONS = {
    IDLE: 'idle',
    MOVE: 'move',
    SCALE: 'scale',
    DELETE: 'delete',
    ROTATE: 'rotate',
};

const initialState = {
    action: CANVAS_ACTIONS.IDLE,
    startTouch: null, // {identifier, x, y}
    moveTouch: null, // {identifier, x, y}
    movePivot: null, // {x, y}
    rotatePivot: 0, // 0 ~ 1
    scalePivot: 0, // 0 ~ 10
};

const ottleActionSlice = createSlice({
    name: 'ottleMaker/action',
    initialState,
    reducers: {
        setStartTouch: (state, action) => {
            state.startTouch = action.payload;
        },
        setMoveTouch: (state, action) => {
            state.moveTouch = action.payload;
        },
        setAction: (state, action) => {
            state.action = action.payload;
        },
        setMovePivot: (state, action) => {
            state.movePivot = action.payload;
        },
        setRotatePivot: (state, action) => {
            state.rotatePivot = action.payload;
        },
        setScalePivot: (state, action) => {
            state.scalePivot = action.payload;
        },
    },
});

/**
 * Touch 에서 identifier, clientX, clientY 만 추출
 * @param {Touch} touch
 * @returns
 */
const getTouchInfo = ({ identifier, clientX, clientY }) => ({
    identifier,
    x: clientX,
    y: clientY,
});

const setItemPivot = () => (dispatch, getState) => {
    const { action } = selectOttleAction(getState());
    const { selected, items } = selectOttleItem(getState());

    switch (action) {
        case CANVAS_ACTIONS.MOVE:
            dispatch(
                ottleActionSlice.actions.setMovePivot(items[selected].position)
            );
            break;
        case CANVAS_ACTIONS.SCALE:
            dispatch(
                ottleActionSlice.actions.setScalePivot(items[selected].scale)
            );
            break;
        case CANVAS_ACTIONS.ROTATE:
            dispatch(
                ottleActionSlice.actions.setRotatePivot(
                    items[selected].rotation
                )
            );
            break;
    }
};

/**
 * onTouchStart를 기록
 * @param {TouchEvent} e
 * @returns
 */
export const setStartTouch = (e) => (dispatch, getState) => {
    dispatch(
        ottleActionSlice.actions.setStartTouch(getTouchInfo(e.touches[0]))
    );
    // store는 바로 업데이트 되지만 함수 전역에 있는 useSelector훅은 바로 업데이트되지 않음
    // 따라서, touhcMove이벤트에서 setMoveTouch를 dispatch 한 뒤
    // 바로 다음 줄에서 touchMove를 사용할경우 업데이트 이전 값을 사용하게 됨.
    dispatch(ottleActionSlice.actions.setMoveTouch(getTouchInfo(e.touches[0])));
    dispatch(setItemPivot());
};
/**
 * onTouchMove를 기록
 * @param {TouchEvent} e
 * @returns
 */
export const setMoveTouch = (e) => (dispatch) => {
    dispatch(ottleActionSlice.actions.setMoveTouch(getTouchInfo(e.touches[0])));
};

export const { setAction } = ottleActionSlice.actions;
export const selectOttleAction = (state) => state.ottleAction;

export default ottleActionSlice.reducer;
