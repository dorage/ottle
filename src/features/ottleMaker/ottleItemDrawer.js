import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpend: false,
    category: [],
    data: [],
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
