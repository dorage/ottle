import { createSlice } from '@reduxjs/toolkit';

export const MODAL_TYPE = {
    YES_OR_NO: 'modal-yes_or_no',
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
            const { type, message, onYesAction, onNoAction } = action.payload;
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
 * modal을 열 때 호출
 * type 값이 필수이며 MODAL_TYPE을 통해 전달
 * @param {*} param0
 * @returns
 */
export const openModal = ({ type, message }) => (dispatch) => {
    if (!type) throw Error('타입은 필수입니다.');
    if (!enumValidate(MODAL_TYPE, type))
        throw Error('MODAL_TYPE의 값으로 전달해주세요');

    dispatch(modalSlice.actions.openModal({ type, message }));
};

export const { closeModal } = modalSlice.actions;
export const selectModal = (state) => state.modal;
export default modalSlice.reducer;
