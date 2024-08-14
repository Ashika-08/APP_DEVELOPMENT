import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: '',
        isAuthenticated: false,
        message: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.email = '';
            state.password = '';
            state.isAuthenticated = false;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { setUser, clearUser, setMessage } = userSlice.actions;

export default userSlice.reducer;