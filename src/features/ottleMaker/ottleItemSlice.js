import { createSlice } from '@reduxjs/toolkit';
import { ALERTS, broadcastAlert } from '../alert/alertSlice';

const MAX_ITEM_COUNT = 18;

export const generateItem = () => ({
    size: { w: 500, h: 500 },
    position: { x: 0.5, y: 0.5 },
    scale: 1.0,
    rotation: 1.0,
    src: 'https://picsum.photos/500',
    name: 'product',
    id: '01',
});

const initialState = {
    selected: NaN, //
    items: [],
};

export const ottleItemSlice = createSlice({
    name: 'ottleMaker/item',
    initialState,
    reducers: {
        selectItem: (state, action) => {
            state.selected = action.payload;
        },
        releaseItem: (state) => {
            state.selected = NaN;
        },
        updateItem: (state, action) => {
            state.items[state.selected] = action.payload;
        },
        addItem: (state, action) => {
            state.items = [...state.items, action.payload];
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

/**
 * 아이템을 추가합니다.
 * @param {*} item
 * @returns {Boolean} 아이템 추가 성공여부
 */
export const addItem = (item) => (dispatch, getState) => {
    const { items } = selectOttleItem(getState());
    if (items.length >= MAX_ITEM_COUNT) {
        dispatch(broadcastAlert(ALERTS.ottleCreate.tooManyItem));
        return false;
    }
    /*
    TODO;
    item은 상품의 정보만 담고 있으니까
    여기서는 변경을 다음과 같이 해줘야 한다.
    {
        position, rotation, scale,
        product:{
            id, name, brand, price,
            img_src:{
                thumbnail, edit, original
            }
        }
    }
    */
    dispatch(ottleItemSlice.actions.addItem(item));
    return true;
};

export const checkItemCount = (items) => items.length >= MAX_ITEM_COUNT;
export const itemHasSelected = (selected) => !isNaN(selected);
export const {
    selectItem,
    releaseItem,
    updateItem,
    removeItem,
} = ottleItemSlice.actions;
export const selectOttleItem = (state) => state.ottleItem;

export default ottleItemSlice.reducer;
