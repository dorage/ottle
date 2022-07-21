import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    w: 0,
    h: 0,
    loading: true,
};

const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        resizeScreen: (state, action) => {
            const { w, h } = action.payload;
            state.loading = false;
            state.w = w;
            state.h = h;
        },
    },
});

export const { resizeScreen } = screenSlice.actions;
export const selectScreen = (state) => state.screen;
export default screenSlice.reducer;
