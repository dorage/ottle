import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOttlesByUID, PAGE } from '../../app/firestore';

const initialState = { lastPage: false, data: [], loading: true, error: false };

export const myOttlesAsyncAction = createAsyncThunk(
    'myOttles/fetch',
    async ({ uid, firstPage }) => {
        try {
            return { firstPage, data: await getOttlesByUID(uid, firstPage) };
        } catch (err) {
            return err;
        }
    }
);

const myOttlesSlice = createSlice({
    name: 'myOttles',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(myOttlesAsyncAction.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(myOttlesAsyncAction.fulfilled, (state, action) => {
            const { data, firstPage } = action.payload;
            state.loading = false;
            state.lastPage = data.length < PAGE;
            state.data = firstPage ? [...data] : [...state.data, ...data];
            state.error = false;
        });
        builder.addCase(myOttlesAsyncAction.rejected, (state, action) => {
            state.loading = false;
            state.lastPage = true;
            state.error = true;
        });
    },
});

export const {} = myOttlesSlice.actions;
export const selectMyOttles = (state) => state.myOttles;
export default myOttlesSlice.reducer;
