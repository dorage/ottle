import { createSlice } from '@reduxjs/toolkit';

// items => 화면에 item을 추가하거나 변경/삭제시  업데이트
// sticker =>

const generateItem = () => ({
    size: { w: 500, h: 500 },
    position: { x: 0.5, y: 0.5 },
    scale: 1.0,
    rotation: 1.0,
    src: 'https://picsum.photos/500',
    name: 'product',
    id: '01',
});

const initialState = {
    selected: 0, //
    items: [generateItem()],
};

export const ottleMakerSlice = createSlice({
    name: 'ottleMaker',
    initialState,
    reducers: {
        select: (state, action) => {},
        update: () => {},
    },
});

export const {} = ottleMakerSlice.actions;
export const selectOttleMaker = (state) => state.ottleMaker;

export default ottleMakerSlice.reducer;
