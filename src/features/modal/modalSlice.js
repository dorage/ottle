import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpend: false,
    onYesAction: null,
    onNoAction: null,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpend = true;
            state.onYesAction = action.payload
                ? action.payload.onYesAction || null
                : null;
            state.onNoAction = action.payload
                ? action.payload.onNoAction || null
                : null;
        },
        closeModal: (state) => {
            state.isOpend = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state) => state.modal;
export default modalSlice.reducer;
