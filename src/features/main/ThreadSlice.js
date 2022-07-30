import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMainThreadDocs } from '../../app/firestore';

const initialState = { lastPage: false, data: [], loading: true, error: false };

export const threadAsyncAction = createAsyncThunk('thread/fetch', async () => {
    try {
        return await getMainThreadDocs();
    } catch (err) {
        return err;
    }
});

const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(threadAsyncAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(threadAsyncAction.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.payload;
        });
    },
});

export const {} = threadSlice.actions;
export const selectThread = (state) => state.thread;
export default threadSlice.reducer;
