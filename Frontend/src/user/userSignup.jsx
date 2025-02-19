import React, { useState,useEffect } from "react";
import "./userSignup.css"; // We'll create this CSS file next
import axiosInstance from "../axios/axiosConfig";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const UserSignup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            navigate("/home"); 
        }
    }, [navigate]);
    const handleSubmit = async (e) => {

        setLoading(true);
        if (!name || !email || !password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }
        else if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            setError('All fields are required');
            setLoading(false);
            return;
        }
        const namePattern = /^[a-zA-Z]+$/;
        if (!name || !namePattern.test(name)) {
            setError('Please enter a valid name');
            setLoading(false);
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        if (!password || password.length < 3) {
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
            const response = await axiosInstance.post('/register', { name, email, password });

            if (response.status === 201) {
                setTimeout(() => navigate('/login'), 1000)
            }

        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setError('Email already exists. Please use a different email.');
            } else {
                setError('An error occurred while registering. Please try again later.');
            }
        }
    };
    return (
        <div className="totSignupContainer">
            <div className="signup-container">
                <div className="signup-box">
                    <h2>Sign Up</h2>
                    {error && <div color="red" className="alert alert-danger">{error}</div>}
                    <form >
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                                placeholder="Enter your name"
                            />

                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}

                                value={email}
                                placeholder="Enter your email"
                            />

                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}

                                value={password}
                                placeholder="Enter your password"
                            />
                        </div>
                        {/* <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div> */}
                        <button onClick={handleSubmit}
                            disabled={loading}
                            type="button" className="signup-button">
                            {loading ? 'Registering...' : ' Sign Up'}
                        </button>
                    </form>
                    <p className="login-link">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserSignup;