import { createSlice } from '@reduxjs/toolkit';

// items => 화면에 item을 추가하거나 변경/삭제시  업데이트
// sticker =>

export const generateItem = () => ({
    size: { w: 500, h: 500 },
    position: { x: 0.5, y: 0.5 },
    scale: 1.0,
    rotation: 1.0,
    src: 'https://picsum.photos/500',
    name: 'product',
    id: '01',
});

const initialState = {
    selected: NaN, //
    items: [],
};

export const ottleItemSlice = createSlice({
    name: 'ottleMaker/item',
    initialState,
    reducers: {
        selectItem: (state, action) => {
            state.selected = action.payload;
        },
        releaseItem: (state) => {
            state.selected = NaN;
        },
        updateItem: (state, action) => {
            state.items[state.selected] = action.payload;
        },
        addItem: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeItem: (state, action) => {
            state.selected =
                state.selected === action.payload ? NaN : state.selected;
            state.items = [
                ...state.items.slice(0, action.payload),
                ...state.items.slice(action.payload + 1),
            ];
        },
    },
});

export const itemHasSelected = (selected) => !isNaN(selected);
export const {
    selectItem,
    releaseItem,
    updateItem,
    removeItem,
} = ottleItemSlice.actions;
export const selectOttleItem = (state) => state.ottleItem;

export default ottleItemSlice.reducer;
