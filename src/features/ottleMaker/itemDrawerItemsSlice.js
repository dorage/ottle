import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getItemsInCategory,
    getItemsRecommend,
    PAGE,
} from '../../app/firestore';
import { _ } from '../../utils/fp';
import { selectItemDrawerCategory } from './itemDrawerCategorySlice';

const initialState = {
    scrollTop: 0,
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
    async (_) => {
        try {
            return { data: await getItemsRecommend(true) };
        } catch (err) {
            return err;
        }
    }
);
/**
 * 이 async action은 itemDrawerCategory에서
 * 메인 category 정보를 가져올 때 dispatch 됩니다.
 * 또한, 페이징을 위해도 사용됩니다.
 */
export const itemDrawerRecommendItemsPagingAsyncAction = createAsyncThunk(
    'itemDrawerItems/fetch-recommend-paging',
    async (_) => {
        try {
            return { data: await getItemsRecommend() };
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
    async ({ category, scrollTop }) => {
        try {
            return {
                scrollTop: scrollTop,
                data: await getItemsInCategory(category.id, true),
            };
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
    async (__, { getState }) => {
        const { path } = selectItemDrawerCategory(getState());
        try {
            return { data: await getItemsInCategory(_.getLastIndex(path).id) };
        } catch (err) {
            return err;
        }
    }
);

const itemDrawerItemsSlice = createSlice({
    name: 'itemDrawerItems',
    initialState,
    reducers: {
        initialize: () => initialState,
        goBackItemDrawerItem: (state, action) => {
            const { lastPage, data, scrollTop } = state.history.pop();
            state.lastPage = lastPage;
            state.data = data;
            state.scrollTop = scrollTop;
        },
    },
    // recommend item
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
                const { data } = action.payload;
                state.loading = false;
                state.lastPage = data.length < PAGE;
                state.data = [...data];
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
        // recommend items for pagination
        builder.addCase(
            itemDrawerRecommendItemsPagingAsyncAction.pending,
            (state, action) => {
                state.loading = true;
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerRecommendItemsPagingAsyncAction.fulfilled,
            (state, action) => {
                const { data } = action.payload;
                state.loading = false;
                state.lastPage = data.length < PAGE;
                state.data = [...state.data, ...data];
                state.error = false;
            }
        );
        builder.addCase(
            itemDrawerRecommendItemsPagingAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.lastPage = true;
                state.error = true;
            }
        );
        // category item
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
                const { scrollTop, data } = action.payload;
                state.loading = false;
                state.data = data;
                state.history[state.history.length - 1].scrollTop = scrollTop;
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
        // category item for pagination
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
                const { data } = action.payload;
                state.loading = false;
                state.lastPage = data.length < PAGE;
                state.data = [...state.data, ...data];
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

export const {
    initialize,
    goBackItemDrawerItem,
} = itemDrawerItemsSlice.actions;
export const selectItemDrawerItems = (state) => state.itemDrawerItems;
export default itemDrawerItemsSlice.reducer;
