import { createSlice } from '@reduxjs/toolkit';

// artboard w,h => 화면이 바뀔 때마다 업데이트
// items => 화면에 item을 추가하거나 변경/삭제시  업데이트
// selected

// 렌더링용 사진의 사이즈는 1080 * 1920 (틱톡 영상 사이즈)
// 편집에는 큰 용량이 필요없으니 2/3 사이즈(720px)에서 작업을 한다.
const MIN_RATION = 2 / 3;
const DEFAULT_SIZE = 1080 * MIN_RATION;

const initialState = {
    size: DEFAULT_SIZE,
    ratio: MIN_RATION, // current size / DEFAULT_SIZE
};

export const artboardSlice = createSlice({
    name: 'ottleMaker/artboard',
    initialState,
    reducers: {
        updateScreenSize: (state, action) => {
            const { size } = action.payload;
            state.size = size;
            state.ratio = (size / DEFAULT_SIZE) * MIN_RATION;
        },
    },
});

/**
 * 화면 resize시 호출할 thunk
 * @returns
 */
export const onResizeArtboard = () => (dispatch, getState) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let size = Math.min(Math.min(w, h), DEFAULT_SIZE, h / 2) - 2 * 16;
    dispatch(updateScreenSize({ size }));
};

export const { updateScreenSize } = artboardSlice.actions;
export const selectArtboard = (state) => state.artboard;

export default artboardSlice.reducer;
