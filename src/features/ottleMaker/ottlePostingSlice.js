import { createSlice } from '@reduxjs/toolkit';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('aceksxz234578', 6);

const initialState = {
    isOpend: false,
    form: {
        title: '',
        description: '',
        saveAsImage: true,
        nanoid: nanoid(),
    },
};

const ottlePosting = createSlice({
    name: 'ottlePosting',
    initialState,
    reducers: {
        initialize: () => initialState,
        openPosting: (state) => {
            state.isOpend = true;
        },
        closePosting: (state) => {
            state.isOpend = false;
        },
        updateForm: (state, action) => {
            state.form = action.payload;
        },
    },
});

export const selectOttlePosting = (state) => state.ottlePosting;
export const {
    initialize,
    openPosting,
    closePosting,
    updateForm,
} = ottlePosting.actions;
export default ottlePosting.reducer;
