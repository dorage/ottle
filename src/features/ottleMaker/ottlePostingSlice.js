import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpend: true,
    form: {
        title: '',
        description: '',
        saveAsImage: true,
    },
};

const ottlePosting = createSlice({
    name: 'ottlePosting',
    initialState,
    reducers: {
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
export const { openPosting, closePosting, updateForm } = ottlePosting.actions;
export default ottlePosting.reducer;
