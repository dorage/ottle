import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllItemCategoryDocs, PAGE } from '../../app/firestore';
import { searchItem } from '../../app/functions';

const initialState = {
    isSearching: false,
    term: '',
    loading: true,
    path: [],
    history: [],
    items: [],
    categories: [],
    error: false,
    // pagination
    paging: false,
    page: 1,
    lastPage: false,
};

const projectCategories = async (facet_count) => {
    const map = await getAllItemCategoryDocs();

    const obj = [];
    for (const { value } of facet_count.counts) {
        obj.push(map[value]);
    }
    return obj;
};

export const itemDrawerSearchAsyncAction = createAsyncThunk(
    'itemDrawerSearch/fetch-search',
    async ({ term }) => {
        if (!term || !term.trim().length) return { isSearching: false };
        const {
            data: { hits, facet_counts },
        } = await searchItem(term);
        const items = hits.map((e) => e.document);
        const mainCategory = await projectCategories(facet_counts[0]);

        return {
            isSearching: true,
            term,
            items,
            categories: mainCategory,
        };
    }
);

export const itemDrawerSearchCategoryAsyncAction = createAsyncThunk(
    'itemDrawerSearch/fetch-sub-category',
    async ({ category }, { dispatch, getState }) => {
        const {
            path,
            categories,
            items,
            lastPage,
            page,
            term,
        } = selectItemDrawerSearch(getState());
        const {
            data: { hits, facet_counts },
        } = await searchItem(term, 1, [...path, category]);
        const newItems = hits.map((e) => e.document);
        const subCategory = await projectCategories(facet_counts[1]);
        return {
            path: [...path, category],
            categories: subCategory,
            items: newItems,
            history: {
                path,
                categories,
                items,
                lastPage,
                page,
            },
        };
    }
);

export const itemDrawerSearchPagingAsyncAction = createAsyncThunk(
    'itemDrawerSearch/fetch-paging',
    async (__, { getState }) => {
        const { path, page, term, lastPage } = selectItemDrawerSearch(
            getState()
        );
        if (lastPage) return { items: [] };
        const {
            data: { hits },
        } = await searchItem(term, page + 1, [...path]);
        const items = hits.map((e) => e.document);
        return {
            items,
        };
    }
);

const itemDrawerSearchSlice = createSlice({
    name: 'itemDrawerSearch',
    initialState,
    reducers: {
        itemDrawerSerachClose: (state) => {
            state.isSearching = false;
        },
        itemDrawerSearchGoBack: (state) => {
            const {
                path,
                page,
                categories,
                items,
                lastPage,
            } = state.history.pop();
            state.path = path;
            state.page = page;
            state.categories = categories;
            state.items = items;
            state.lastPage = lastPage;
        },
    },
    extraReducers(builder) {
        // 검색시 첫 결과
        builder.addCase(itemDrawerSearchAsyncAction.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.lastPage = false;
        });
        builder.addCase(
            itemDrawerSearchAsyncAction.fulfilled,
            (state, action) => {
                const { isSearching, term, items, categories } = action.payload;
                state.isSearching = isSearching;
                state.loading = false;
                state.term = term;
                state.items = items;
                state.categories = categories;
            }
        );
        builder.addCase(itemDrawerSearchAsyncAction.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        // 검색 결과 내 category 클릭시
        builder.addCase(
            itemDrawerSearchCategoryAsyncAction.pending,
            (state) => {
                state.loading = true;
                state.error = false;
                state.lastPage = false;
            }
        );
        builder.addCase(
            itemDrawerSearchCategoryAsyncAction.fulfilled,
            (state, action) => {
                const { path, categories, items, history } = action.payload;
                state.loading = false;
                state.path = path;
                state.items = items;
                state.lastPage = items.length < PAGE;
                state.categories = categories;
                state.history = [...state.history, history];
            }
        );
        builder.addCase(
            itemDrawerSearchCategoryAsyncAction.rejected,
            (state) => {
                state.loading = false;
                state.error = true;
            }
        );
        // 검색결과 페이징
        builder.addCase(itemDrawerSearchPagingAsyncAction.pending, (state) => {
            state.paging = true;
            state.error = false;
        });
        builder.addCase(
            itemDrawerSearchPagingAsyncAction.fulfilled,
            (state, action) => {
                const { items } = action.payload;
                state.paging = false;
                state.page += 1;
                state.items = [...state.items, ...items];
                state.lastPage = items.length < PAGE;
            }
        );
        builder.addCase(itemDrawerSearchPagingAsyncAction.rejected, (state) => {
            state.paging = false;
            state.error = true;
        });
    },
});

export const itemDrawerSearchGoBack = () => (dispatch, getState) => {
    const { history } = selectItemDrawerSearch(getState());
    if (history.length) {
        dispatch(itemDrawerSearchSlice.actions.itemDrawerSearchGoBack());
    } else {
        dispatch(itemDrawerSearchSlice.actions.itemDrawerSerachClose());
    }
};

export const {} = itemDrawerSearchSlice.actions;
export const selectItemDrawerSearch = (state) => state.itemDrawerSearch;
export default itemDrawerSearchSlice.reducer;
