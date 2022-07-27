import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getMainItemCategoryDocs,
    getSubItemCategoryDocs,
} from '../../app/firestore';
import {
    goBackItemDrawerItem,
    itemDrawerCategoryItemsAsyncAction,
    itemDrawerRecommendItemsAsyncAction,
} from './itemDrawerItemsSlice';

const initialState = {
    path: [],
    history: [],
    data: [],
    loading: true,
    error: null,
};

export const itemDrawerMainCategoryAsyncAction = createAsyncThunk(
    'itemDrawerCategory/fetch-main-category',
    async (_, { dispatch }) => {
        try {
            dispatch(itemDrawerRecommendItemsAsyncAction());
            return await getMainItemCategoryDocs();
        } catch (err) {
            return err;
        }
    }
);
export const itemDrawerSubCategoryAsyncAction = createAsyncThunk(
    'itemDrawerCategory/fetch-sub-category',
    async (categoryId, { dispatch, getState }) => {
        try {
            const { path } = selectItemDrawerCategory(getState());

            dispatch(itemDrawerCategoryItemsAsyncAction(categoryId));
            return {
                path: categoryId,
                data: await getSubItemCategoryDocs([...path, categoryId]),
            };
        } catch (err) {
            return err;
        }
    }
);

const itemDrawerCategorySlice = createSlice({
    name: 'itemDrawerCategory',
    initialState,
    reducers: {
        goBackItemDrawerCategory: (state, action) => {
            state.data = state.history.pop();
            state.path.pop();
        },
    },
    extraReducers(builder) {
        builder.addCase(
            itemDrawerMainCategoryAsyncAction.pending,
            (state, action) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            }
        );
        builder.addCase(
            itemDrawerMainCategoryAsyncAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            }
        );
        builder.addCase(
            itemDrawerMainCategoryAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            }
        );
        builder.addCase(
            itemDrawerSubCategoryAsyncAction.pending,
            (state, action) => {
                state.loading = true;
            }
        );
        builder.addCase(
            itemDrawerSubCategoryAsyncAction.fulfilled,
            (state, action) => {
                const { path, data } = action.payload;
                state.loading = false;
                state.path = [...state.path, path];
                state.history = [...state.history, state.data];
                state.data = data;
                state.error = null;
            }
        );
        builder.addCase(
            itemDrawerSubCategoryAsyncAction.rejected,
            (state, action) => {
                const { path, data } = action.payload;
                state.loading = false;
                state.path = [...state.path, path];
                state.history = [...state.history, state.data];
                state.data = [];
                state.error = data;
            }
        );
    },
});

export const goBackItemDrawerCategory = () => (dispatch) => {
    dispatch(itemDrawerCategorySlice.actions.goBackItemDrawerCategory());
    dispatch(goBackItemDrawerItem());
};

export const {} = itemDrawerCategorySlice.actions;
export const selectItemDrawerCategory = (state) => state.itemDrawerCategory;
export default itemDrawerCategorySlice.reducer;
