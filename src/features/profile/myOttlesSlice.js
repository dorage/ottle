import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOttleDocs } from '../../app/firestore';
import { selectUser } from '../user/userSlice';

const initialState = { data: null, loading: true, error: null };

export const myOttlesAsyncAction = createAsyncThunk(
    'myOttles/fetch',
    async (uid, { dispatch, getState }) => {
        try {
            return await getOttleDocs(uid);
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
        builder.addCase(myOttlesAsyncAction.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(myOttlesAsyncAction.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});

export const {} = myOttlesSlice.actions;
export const selectMyOttles = (state) => state.myOttles;
export default myOttlesSlice.reducer;
