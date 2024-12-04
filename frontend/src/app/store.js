import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../app/slices/userSlice';
import authReducer from '../app/slices/authSlice';

const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer,
    },
});

export default store;
