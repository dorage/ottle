import { createSlice } from '@reduxjs/toolkit';
import { generateItem } from './ottleItemSlice';

const initialState = {
    isOpend: true,
    path: [],
    category: ['상의', '하의', '악세사리', '스티커'],
    data: [
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
        generateItem(),
    ],
};

const ottleItemDrawer = createSlice({
    name: 'ottleItemDrawer',
    initialState,
    reducers: {
        openItemDrawer: (state) => {
            state.isOpend = true;
        },
        closeItemDrawer: (state) => {
            state.isOpend = false;
        },
    },
});

export const selectOttleItemDrawer = (state) => state.ottleItemDrawer;
export const { openItemDrawer, closeItemDrawer } = ottleItemDrawer.actions;
export default ottleItemDrawer.reducer;
