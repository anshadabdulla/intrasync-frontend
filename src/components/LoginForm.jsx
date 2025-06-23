import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';
import '../assets/styles/loginForm.css';
import illustration from '../assets/images/illustrations.png';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSuccess(false);
        try {
            const res = await login(email, password);
            if (res.data.status) {
                localStorage.setItem('token', res.data.token);
                setSuccess(true);
                setMessage('Login successful!');
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                setMessage(res.data.errors?.[0] || 'Login failed.');
            }
        } catch (err) {
            setMessage(err.response?.data?.errors?.[0] || 'Server error.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-illustration">
                    <img src={illustration} alt="Illustration" />
                </div>
                <div className="login-container">
                    <form onSubmit={handleSubmit} className="login-form">
                        <h2 className="login-title">Welcome Back</h2>
                        <p className="login-subtitle">Sign in to continue</p>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                        <div className="login-options">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <button type="button" className="link-button" onClick={() => navigate('/forgot-password')}>
                                Forgot Password?
                            </button>
                        </div>
                        <button type="submit" className="login-button">
                            Login
                        </button>
                        <p
                            className={`login-message ${message ? 'visible' : ''}`}
                            style={{ color: success ? 'green' : 'red' }}
                        >
                            {message || ' '}
                        </p>
                        <p className="login-footer"> Powered by Intrasync </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
