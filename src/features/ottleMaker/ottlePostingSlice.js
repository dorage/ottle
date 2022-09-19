import { createSlice } from '@reduxjs/toolkit';
import { customAlphabet } from 'nanoid';

// 가독성이 좋은 알파벳
const legibleAlphabet = 'aceksxz234578';
const nanoid = customAlphabet(legibleAlphabet, 6);

/**
 * @typedef {{
 *  nanoid: string,
 *  title: string,
 *  description: string,
 *  saveAsImage: boolean,
 *  isVisible: boolean,
 * }} PostingData
 */
const initialState = {
    isOpend: false,
    form: {
        title: '',
        description: '',
        saveAsImage: true,
        nanoid: nanoid(),
        isPrivate: false,
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
