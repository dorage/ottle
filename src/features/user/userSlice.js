import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userData = {
    isAuth: false,
    user: null,
    loading: true,
    error: null,
};

export const signInAsyncAction = createAsyncThunk(
    'user/signin',
    async (signInFn) => {
        return await signInFn();
    }
);

export const signOutAsyncAction = createAsyncThunk(
    'user/signout',
    async (signOutFn) => {
        if (await signOutFn()) return;
        throw Error('You failed to sign out');
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: userData,
    reducers: {
        checkAuth: (state, action) => {
            state.isAuth = action.payload ? true : false;
            state.user = action.payload ? action.payload : null;
            state.loading = false;
        },
    },
    extraReducers(builder) {
        builder.addCase(signInAsyncAction.pending, (state) => {
            state.isAuth = false;
            state.user = null;
        });
        builder.addCase(signInAsyncAction.fulfilled, (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
        });
        builder.addCase(signInAsyncAction.rejected, (state) => {
            state.isAuth = false;
            state.user = null;
        });
        builder.addCase(signOutAsyncAction.fulfilled, (state) => {
            state.isAuth = false;
            state.user = null;
        });
    },
});

export const { checkAuth } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
