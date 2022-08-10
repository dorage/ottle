import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PAGE_SMALL } from '../../app/firestore';

const initialState = { lastPage: false, data: [], loading: true, error: false };

export const threadAsyncAction = createAsyncThunk('thread/fetch', async () => {
    try {
    } catch (err) {
        return err;
    }
});

const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(threadAsyncAction.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(threadAsyncAction.fulfilled, (state, action) => {
            state.loading = false;
            state.lastPage = action.payload < PAGE_SMALL;
            state.data = [...state.data, ...action.payload];
            state.error = null;
        });
        builder.addCase(threadAsyncAction.rejected, (state, action) => {
            state.loading = false;
            state.lastPage = true;
            state.error = action.payload;
        });
    },
});

export const {} = threadSlice.actions;
export const selectThread = (state) => state.thread;
export default threadSlice.reducer;
