// import React, { useState } from "react";
// import "./adminLogin.css"; 
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axiosInstance from "../axios/axiosConfig";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const Navigate = useNavigate()
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email || !email.trim()) {
//             setError('Please enter a valid email');
//             setLoading(false);
//             return;
//         }
//         else if (!email || !emailPattern.test(email)) {
//             setError('Please enter a valid email address');
//             setLoading(false);
//             return;
//         }
//         if (password.trim() === '') {
//             setError('Please enter the password');
//             setLoading(false);
//             return;
//         }
//         else if (!password || password.length < 3) {
//             setError('Password must be at least 6 characters long');
//             setLoading(false);
//             return;
//         }
//         else if (/\s/.test(password)) {
//             setError('Password cannot contain whitespace');
//             setLoading(false);
//             return;
//         }
//         try {
//             const response = await axiosInstance.post('/admin/login', {
//                 email,
//                 password,
//             });

//             console.log(response.data.token)
//             if (response.status === 200) {
//                 localStorage.setItem('token', response.data.token);
//                 setTimeout(() => Navigate('/admin/dashboard'), 1500)
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//             setError('Invalid credentials. Please try again.');
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="totalContainer">
//             <div className="login-container">
//                 <div className="login-box">
//                     <h2> Admin Login</h2>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     <form >
//                         <div className="input-group">
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="Enter your email"
//                                 required
//                             />
//                         </div>
//                         <div className="input-group">
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 placeholder="Enter your password"
//                                 required
//                             />
//                         </div>
//                         <button onClick={handleLogin} type="submit" className="login-button">
//                             Login
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css"; 

const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string()
        .min(3, "Password must be at least 6 characters long")
        .matches(/^\S*$/, "Password cannot contain whitespace")
        .required("Password is required"),
});

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/admin/login", data);

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                toast.success("Login successful!", { autoClose: 1500 });
                setTimeout(() => navigate("/admin/dashboard"), 1500);
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="totalContainer">
            <div className="login-container">
                <div className="login-box">
                    <h2>Admin Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email")}
                                placeholder="Enter your email"
                            />
                            <p className="error">{errors.email?.message}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                {...register("password")}
                                placeholder="Enter your password"
                            />
                            <p className="error">{errors.password?.message}</p>
                        </div>
                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
