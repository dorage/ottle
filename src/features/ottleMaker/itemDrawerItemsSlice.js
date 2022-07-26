import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getItemsInCategory, getItemsRecommend } from '../../app/firestore';

const initialState = { history: [], data: [], loading: true, error: null };

export const itemDrawerRecommendItemsAsyncAction = createAsyncThunk(
    'itemDrawerItems/fetch-recommend',
    async () => {
        try {
            return await getItemsRecommend();
        } catch (err) {
            return err;
        }
    }
);
export const itemDrawerCategoryItemsAsyncAction = createAsyncThunk(
    'itemDrawerItems/fetch-category',
    async (categoryId) => {
        try {
            return await getItemsInCategory(categoryId);
        } catch (err) {
            return err;
        }
    }
);

const itemDrawerItemsSlice = createSlice({
    name: 'itemDrawerItems',
    initialState,
    reducers: {
        goBackItemDrawerItem: (state, action) => {
            state.data = state.history.pop();
        },
    },
    extraReducers(builder) {
        builder.addCase(
            itemDrawerRecommendItemsAsyncAction.pending,
            (state, action) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            }
        );
        builder.addCase(
            itemDrawerRecommendItemsAsyncAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            }
        );
        builder.addCase(
            itemDrawerRecommendItemsAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            }
        );
        builder.addCase(
            itemDrawerCategoryItemsAsyncAction.pending,
            (state, action) => {
                state.loading = true;
                state.history = [...state.history, state.data];
            }
        );
        builder.addCase(
            itemDrawerCategoryItemsAsyncAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            }
        );
        builder.addCase(
            itemDrawerCategoryItemsAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            }
        );
    },
});

export const { goBackItemDrawerItem } = itemDrawerItemsSlice.actions;
export const selectItemDrawerItems = (state) => state.itemDrawerItems;
export default itemDrawerItemsSlice.reducer;
