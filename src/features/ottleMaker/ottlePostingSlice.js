import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    isOpend: true,
    form: {
        title: '',
        description: '',
        saveAsImage: true,
        nanoid: nanoid(6),
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
