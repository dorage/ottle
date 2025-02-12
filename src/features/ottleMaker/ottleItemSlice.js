import { createSlice } from '@reduxjs/toolkit';
import { ALERTS, broadcastAlert } from '../alert/alertSlice';

const MAX_ITEM_COUNT = 18;

const initialState = {
    selected: NaN, //
    items: [],
};

export const ottleItemSlice = createSlice({
    name: 'ottleMaker/item',
    initialState,
    reducers: {
        initialize: () => initialState,
        selectItem: (state, action) => {
            state.selected = action.payload;
        },
        releaseItem: (state) => {
            state.selected = NaN;
        },
        updateItem: (state, action) => {
            state.items[state.selected] = action.payload;
        },
        updateItems: (state, action) => {
            // 레이어 순서를 바꿀때만 사용하기
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items = [action.payload, ...state.items];
        },
        removeItem: (state, action) => {
            state.selected =
                state.selected === action.payload ? NaN : state.selected;
            state.items = [
                ...state.items.slice(0, action.payload),
                ...state.items.slice(action.payload + 1),
            ];
        },
    },
});

export const bringFoward = () => (dispatch, getState) => {
    const { selected, items } = selectOttleItem(getState());
    if (selected === 0) return;
    dispatch(
        ottleItemSlice.actions.updateItems([
            ...items.slice(0, Math.max(selected - 1, 0)),
            items[selected],
            items[selected - 1],
            ...items.slice(selected + 1),
        ])
    );
    dispatch(ottleItemSlice.actions.selectItem(selected - 1));
};
export const sendBackward = () => (dispatch, getState) => {
    const { selected, items } = selectOttleItem(getState());
    if (selected === items.length - 1) return;
    dispatch(
        ottleItemSlice.actions.updateItems([
            ...items.slice(0, selected),
            items[selected + 1],
            items[selected],
            ...items.slice(selected + 2),
        ])
    );
    dispatch(ottleItemSlice.actions.selectItem(selected + 1));
};

const genNewItem = ({ w, h }, product) => ({
    size: { w, h },
    position: { x: 0.5, y: 0.5 },
    scale: 1.0,
    rotation: 1.0,
    product,
});
/**
 * 아이템을 추가합니다.
 * @param {*} item
 * @returns {Boolean} 아이템 추가 성공여부
 */
export const addItem = (product) => (dispatch, getState) => {
    const { items } = selectOttleItem(getState());
    if (items.length >= MAX_ITEM_COUNT) {
        dispatch(broadcastAlert(ALERTS.ottleCreate.tooManyItem));
        return false;
    }

    const img = new Image();
    img.src = product.image.original;
    img.onload = function() {
        dispatch(
            ottleItemSlice.actions.addItem(
                genNewItem({ w: this.width, h: this.height }, product)
            )
        );
    };
};

export const checkItemCount = (items) => items.length >= MAX_ITEM_COUNT;
export const itemHasSelected = (selected) => !isNaN(selected);
export const {
    initialize,
    selectItem,
    releaseItem,
    updateItem,
    removeItem,
} = ottleItemSlice.actions;
export const selectOttleItem = (state) => state.ottleItem;

export default ottleItemSlice.reducer;
