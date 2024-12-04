import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
    const response = await axios.post('http://localhost:5000/auth/login', credentials);
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, loading: false, error: null },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = 'Invalid credentials';
                state.loading = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
