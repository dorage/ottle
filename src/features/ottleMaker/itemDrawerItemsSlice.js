import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getItemsInCategory } from '../../app/firestore';

const initialState = { history: [], data: [], loading: true, error: false };

export const itemDrawerItemsAsyncAction = createAsyncThunk(
    'itemDrawerItems/fetch',
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
    reducers: {},
    extraReducers(builder) {
        builder.addCase(itemDrawerItemsAsyncAction.pending, (state, action) => {
            state.loading = true;
            state.data = [];
            state.error = null;
        });
        builder.addCase(
            itemDrawerItemsAsyncAction.fulfilled,
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            }
        );
        builder.addCase(
            itemDrawerItemsAsyncAction.rejected,
            (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            }
        );
    },
});

export const {} = itemDrawerItemsSlice.actions;
export const selectItemDrawerItems = (state) => state.itemDrawerItems;
export default itemDrawerItemsSlice.reducer;
