import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOttlesOfUser } from '../../app/firestore';

const initialState = { data: null, loading: true, error: null };

export const myOttlesAsyncAction = createAsyncThunk(
    'myOttles/fetch',
    async (uid, { dispatch, getState }) => {
        try {
            return await getOttlesOfUser(uid);
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
