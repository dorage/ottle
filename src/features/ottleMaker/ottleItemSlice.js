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

export const ottleItemSlice = createSlice({
    name: 'ottleMaker/item',
    initialState,
    reducers: {
        selectItem: (state, action) => {},
        releaseItem: (state) => {
            state.selected = null;
        },
        updateItem: (state, action) => {
            state.items[state.selected] = action.payload;
        },
    },
});

export const { selectItem, releaseItem, updateItem } = ottleItemSlice.actions;
export const selectOttleItem = (state) => state.ottleItem;

export default ottleItemSlice.reducer;
