import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const actionResponse = await dispatch(loginUser({ username, password })); // Dispatch and await the action
            const token = actionResponse.payload.token; // Make sure you access the token from the response correctly

            if (token) {
                localStorage.setItem('token', token); // Save token in localStorage
                navigate('/dashboard');
            } else {
                console.error('Invalid credentials');
            }
        } catch (error) {
            console.error(error)
        }
    };


    return (
        <div className="login-container">
            <h1 className="login-title">Welcome Back!</h1>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <p className="error-text">{error}</p>}
                <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;
