import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {{
 *  AUTH: {
 *   NOT_SIGN_IN: string,
 *  },
 *  OTTLE: {
 *   DELETE: string,
 *   SHOW: string
 *   HIDE: string,
 *  },
 *  OTTLE_CREATE: {
 *   GO_BACK: string,
 *  }
 * }} MODAL_TYPE
 */
/**
 * @type {MODAL_TYPE}
 */
export const MODAL_TYPE = {
    AUTH: {
        NOT_SIGN_IN: 'modal-auth-not_sign_in',
    },
    OTTLE: {
        DELETE: 'modal-ottle-delete',
        SHOW: 'modal-ottle-show',
        HIDE: 'modal-ottle-hide',
    },
    OTTLE_CREATE: {
        GO_BACK: 'modal-ottle_create-go_back',
    },
};

const initialState = {
    type: null,
    isOpend: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            const { type } = action.payload;
            state.type = type;
            state.isOpend = true;
        },
        closeModal: (state) => {
            state.type = null;
            state.isOpend = false;
        },
    },
});

/**
 * @typedef {{
 *  type: MODAL_TYPE,
 *  message: string
 * }} MODAL_PARAMETER
 */
/**
 *
 * modal을 열 때 호출
 * type 값이 필수이며 MODAL_TYPE을 통해 전달
 * @param {MODAL_PARAMETER} param0
 * @returns
 */
export const openModal = ({ type }) => (dispatch, getState) => {
    const { isOpend } = selectModal(getState());
    if (isOpend) throw Error('모달이 이미 열려 있습니다.');
    if (!type) throw Error('타입은 필수입니다.');

    dispatch(modalSlice.actions.openModal({ type }));
};

export const { closeModal } = modalSlice.actions;
export const selectModal = (state) => state.modal;
export default modalSlice.reducer;
