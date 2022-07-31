import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isOpend: false,
};

const itemDrawer = createSlice({
    name: 'itemDrawer',
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

export const selectItemDrawer = (state) => state.itemDrawer;
export const { openItemDrawer, closeItemDrawer } = itemDrawer.actions;
export default itemDrawer.reducer;
