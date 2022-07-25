import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getItemCategories } from '../../app/firestore';

const initialState = { history: [], data: [], loading: true, error: false };

export const itemDrawerCategoryAsyncAction = createAsyncThunk(
    'itemDrawerCategory/fetch',
    async () => {
        try {
            return await getItemCategories();
        } catch (err) {
            return err;
        }
    }
);

const itemDrawerCategorySlice = createSlice({
    name: 'itemDrawerCategory',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            itemDrawerCategoryAsyncAction.pending,
            (state, action) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            }
        );
        builder.addCase(
            itemDrawerCategoryAsyncAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            }
        );
        builder.addCase(
            itemDrawerCategoryAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            }
        );
    },
});

export const {} = itemDrawerCategorySlice.actions;
export const selectItemDrawerCategory = (state) => state.itemDrawerCategory;
export default itemDrawerCategorySlice.reducer;
