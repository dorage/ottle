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
    error: false,
};

export const itemDrawerMainCategoryAsyncAction = createAsyncThunk(
    'itemDrawerCategory/fetch-main-category',
    async (_, { dispatch }) => {
        dispatch(itemDrawerRecommendItemsAsyncAction());
        return { data: await getMainItemCategoryDocs() };
    }
);
export const itemDrawerSubCategoryAsyncAction = createAsyncThunk(
    'itemDrawerCategory/fetch-sub-category',
    async ({ categoryId, scrollTop }, { dispatch, getState }) => {
        const { path } = selectItemDrawerCategory(getState());

        dispatch(itemDrawerCategoryItemsAsyncAction({ categoryId, scrollTop }));
        return {
            path: categoryId,
            data: await getSubItemCategoryDocs([...path, categoryId]),
        };
    }
);

const itemDrawerCategorySlice = createSlice({
    name: 'itemDrawerCategory',
    initialState,
    reducers: {
        initialize: () => initialState,
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
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerMainCategoryAsyncAction.fulfilled,
            (state, action) => {
                const { data } = action.payload;
                state.loading = false;
                state.data = data;
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerMainCategoryAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = true;
            }
        );
        builder.addCase(
            itemDrawerSubCategoryAsyncAction.pending,
            (state, action) => {
                state.loading = true;
                state.history = [...state.history, state.data];
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerSubCategoryAsyncAction.fulfilled,
            (state, action) => {
                const { path, data } = action.payload;
                state.loading = false;
                state.path = [...state.path, path];
                state.data = data;
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerSubCategoryAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = true;
            }
        );
    },
});

export const goBackItemDrawerCategory = () => (dispatch) => {
    dispatch(itemDrawerCategorySlice.actions.goBackItemDrawerCategory());
    dispatch(goBackItemDrawerItem());
};

export const { initialize } = itemDrawerCategorySlice.actions;
export const selectItemDrawerCategory = (state) => state.itemDrawerCategory;
export default itemDrawerCategorySlice.reducer;
