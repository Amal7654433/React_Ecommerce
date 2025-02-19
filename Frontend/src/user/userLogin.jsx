import React, { useState,useEffect } from "react";
import "./userLogin.css"; // We'll create this CSS file next
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from "../axios/axiosConfig";

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            navigate("/home"); // Redirect to dashboard
        }
    }, [navigate]);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.trim()) {
            setError('Please enter a valid email');
            setLoading(false);
            return;
        }
        else if (!email || !emailPattern.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }
        if (password.trim() === '') {
            setError('Please enter the password');
            setLoading(false);
            return;
        }
        else if (!password || password.length < 3) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }
        else if (/\s/.test(password)) {
            setError('Password cannot contain whitespace');
            setLoading(false);
            return;
        }
        try {
            const response = await axiosInstance.post('/login', {
                email,
                password
            }, { withCredentials: true });
          
            if (response.status === 200) {
                localStorage.setItem('userToken',response.data.token)
                console.log(response.data.token)
                setTimeout(() => {
                    navigate("/home"); // Redirect after toast
                }, 1500);
            }
        } catch (error) {
            console.error('Failed to sign up:', error);
            if (error.response && error.response.status === 401) {
                setError('Incorrect password or email');
                setLoading(false);
            } else {
                setError('Failed to log in. Please try again.');
                setLoading(false);
            }
        }
    };

    return (
        <div className="totUserLoginContainer">
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form >
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />

                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />

                        </div>
                        <button type="button" onClick={handleSubmit} className="login-button" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="signup-link">
                        Don't have an account? <a href="/register">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;