import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {{
 *  AUTH: {
 *   NOT_SIGN_IN: string,
 *  },
 *  OTTLE: {
 *   DELETE: string,
 *   HIDE: string,
 *  },
 *  OTTLE_CREATE: {
 *   GO_BACK: string,
 *  },
 *  YES_OR_NO: string,
 *  SIGN_IN : string
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
        HIDE: 'modal-ottle-hide',
    },
    OTTLE_CREATE: {
        GO_BACK: 'modal-ottle_create-go_back',
    },
    YES_OR_NO: 'modal-yes_or_no',
    SIGN_IN: 'modal-sign_in',
};

/**
 * ENUM 오브젝트 범위안의 값인지 확인합니다.
 * @param {*} ENUM
 * @param {*} val
 * @returns
 */
const enumValidate = (ENUM, val) =>
    Object.keys(ENUM).some((key) => ENUM[key] === val);

const initialState = {
    type: null,
    isOpend: false,
    message: '',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            const { type, message } = action.payload;
            state.type = type;
            state.isOpend = true;
            state.message = message;
        },
        closeModal: (state) => {
            state.type = null;
            state.isOpend = false;
            state.message = '';
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
export const openModal = ({ type, message }) => (dispatch, getState) => {
    const { isOpend } = selectModal(getState());
    if (isOpend) throw Error('모달이 이미 열려 있습니다.');
    if (!type) throw Error('타입은 필수입니다.');
    if (!enumValidate(MODAL_TYPE, type))
        throw Error('MODAL_TYPE의 값으로 전달해주세요');

    dispatch(modalSlice.actions.openModal({ type, message }));
};

export const { closeModal } = modalSlice.actions;
export const selectModal = (state) => state.modal;
export default modalSlice.reducer;
