import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (params) => {
    const { search, startDate, endDate, token } = params;
    const response = await axios.get('http://localhost:5000/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, startDate, endDate },
    });
    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: { data: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            });
    },
});

export default usersSlice.reducer;
