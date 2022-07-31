import { createSlice } from '@reduxjs/toolkit';
import { clamp, scalePercent } from '../../configs/utils';
import { selectScreen } from '../screen/screenSlice';
import { selectOttleAction } from './ottleActionSlice';

// artboard w,h => 화면이 바뀔 때마다 업데이트
// items => 화면에 item을 추가하거나 변경/삭제시  업데이트
// selected

// 렌더링용 사진의 사이즈는 1080 * 1920 (틱톡 영상 사이즈)
// 편집에는 큰 사이즈가 필요없으니 2/3 사이즈(720px)에서 작업을 한다.
const MIN_RATIO = 2 / 3;
export const ARTBOARD_SIZE = 1080;
const DEFAULT_SIZE = ARTBOARD_SIZE * MIN_RATIO;

export const MULTIPLE_MIN = 0.5;
export const MULTIPLE_MAX = 2;

const initialState = {
    size: DEFAULT_SIZE,
    ratio: MIN_RATIO, // current size / DEFAULT_SIZE
    position: { x: 0, y: 0 },
    multiple: 1.0,
};

export const artboardSlice = createSlice({
    name: 'ottleMaker/artboard',
    initialState,
    reducers: {
        initialize: (state) => {
            state.position = { x: 0, y: 0 };
            state.multiple = 1.0;
        },
        updateScreenSize: (state, action) => {
            const { size } = action.payload;
            state.size = size;
            state.ratio = (size / DEFAULT_SIZE) * MIN_RATIO;
            state.position = { x: 0, y: 0 };
            state.multiple = 1.0;
        },
        updateMulitple: (state, action) => {
            state.multiple = action.payload;
        },
        updatePosition: (state, action) => {
            const { x, y } = action.payload;
            state.position.x = x;
            state.position.y = y;
        },
    },
});

/**
 * 화면 resize시 호출할 thunk
 * @returns
 */
export const onResizeArtboard = () => (dispatch, getState) => {
    const { w, h } = selectScreen(getState());
    let size = Math.min(Math.min(w, h), DEFAULT_SIZE, h / 2) - 2 * 16;
    dispatch(updateScreenSize({ size }));
};

export const onMoveArtboard = () => (dispatch, getState) => {
    const {
        startTouch: { x: sx, y: sy },
        moveTouch: { x: mx, y: my },
    } = selectOttleAction(getState());
    const {
        size,
        ratio,
        position: { x, y },
        multiple,
    } = selectArtboard(getState());

    if (multiple <= 1) return;

    const dx = (mx - sx) / 3; // - arboard size;
    const dy = (my - sy) / 3; // - arboard size;
    const max = size * multiple * ratio;

    dispatch(
        updatePosition({
            x: clamp(x + dx, -1 * max, max),
            y: clamp(y + dy, -1 * max, max),
        })
    );
};

const snap = (val) => {
    if (val > 0.9 && val < 1.1) {
        return 1;
    }
    return val;
};

export const percentToMultiple = (percent) => {
    return percent / (100 / (MULTIPLE_MAX - MULTIPLE_MIN)) + MULTIPLE_MIN;
};
export const multipleToPercent = (multiple) => {
    return ((multiple - MULTIPLE_MIN) / (MULTIPLE_MAX - MULTIPLE_MIN)) * 100;
};
export const updateMulitple = (value) => (dispatch) => {
    const multiple = snap(percentToMultiple(value));
    dispatch(artboardSlice.actions.updateMulitple(multiple));

    if (multiple <= 1) dispatch(updatePosition({ x: 0, y: 0 }));
};
export const {
    initialize,
    updateScreenSize,
    updatePosition,
} = artboardSlice.actions;
export const selectArtboard = (state) => state.artboard;

export default artboardSlice.reducer;
