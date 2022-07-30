import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOttlesByUID } from '../../app/firestore';

const initialState = { data: [], loading: true, error: null };

export const myOttlesAsyncAction = createAsyncThunk(
    'myOttles/fetch',
    async (uid, { dispatch, getState }) => {
        try {
            return await getOttlesByUID(uid);
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
            state.data = [...state.data, ...action.payload];
            state.error = null;
        });
        builder.addCase(myOttlesAsyncAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const {} = myOttlesSlice.actions;
export const selectMyOttles = (state) => state.myOttles;
export default myOttlesSlice.reducer;
