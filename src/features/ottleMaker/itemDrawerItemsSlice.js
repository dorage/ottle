import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getItemsInCategory,
    getItemsRecommend,
    PAGE,
} from '../../app/firestore';

const initialState = {
    lastPage: false,
    history: [],
    data: [],
    loading: true,
    error: false,
};

/**
 * 이 async action은 itemDrawerCategory에서
 * 메인 category 정보를 가져올 때 dispatch 됩니다.
 * 또한, 페이징을 위해도 사용됩니다.
 */
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
/**
 * 이 async action은 itemDrawerCategory에서
 * 서브 category 정보를 가져올 때 dispatch 됩니다.
 */
export const itemDrawerCategoryItemsAsyncAction = createAsyncThunk(
    'itemDrawerItems/fetch-category',
    async (categoryId) => {
        try {
            return await getItemsInCategory(categoryId, true);
        } catch (err) {
            return err;
        }
    }
);
/**
 * 이 async action은
 * 서브 category 정보를 추가로 가져올 때 사용됩니다.
 */
export const itemDrawerCategoryItemsPagingAsyncAction = createAsyncThunk(
    'itemDrawerItems/fetch-category-paging',
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
            const { lastPage, data } = state.history.pop();
            state.lastPage = lastPage;
            state.data = data;
        },
    },
    extraReducers(builder) {
        builder.addCase(
            itemDrawerRecommendItemsAsyncAction.pending,
            (state, action) => {
                state.loading = true;
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerRecommendItemsAsyncAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.lastPage = action.payload.length < PAGE;
                state.data = [...state.data, ...action.payload];
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerRecommendItemsAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.lastPage = true;
                state.error = true;
            }
        );
        builder.addCase(
            itemDrawerCategoryItemsAsyncAction.pending,
            (state, action) => {
                state.loading = true;
                state.history = [
                    ...state.history,
                    { lastPage: state.lastPage, data: state.data },
                ];
                state.data = [];
                state.lastPage = false;
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerCategoryItemsAsyncAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerCategoryItemsAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.error = true;
            }
        );
        builder.addCase(
            itemDrawerCategoryItemsPagingAsyncAction.pending,
            (state, action) => {
                state.loading = true;
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerCategoryItemsPagingAsyncAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.lastPage = action.payload.length < PAGE;
                state.data = [...state.data, ...action.payload];
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerCategoryItemsPagingAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.lastPage = true;
                state.error = true;
            }
        );
    },
});

export const { goBackItemDrawerItem } = itemDrawerItemsSlice.actions;
export const selectItemDrawerItems = (state) => state.itemDrawerItems;
export default itemDrawerItemsSlice.reducer;
