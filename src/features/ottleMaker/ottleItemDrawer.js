import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: null,
    data: null,
};

const ottleItemDrawer = createSlice({
    name: 'ottleItemDrawer',
    initialState,
    reducers: {},
});

export default ottleItemDrawer.reducer;
