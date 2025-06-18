import React, { useState } from 'react';
import { login } from '../api/authService';
import '../assets/styles/loginForm.css';
import illustration from '../assets/images/illustrations.png'; // Ensure correct image path

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

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
                        <h2 className="login-title">Sign in to your account</h2>
                        <input
                            type="email"
                            placeholder="Email"
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
                                <input type="checkbox" /> Keep me signed in
                            </label>
                            <button
                                type="button"
                                className="link-button"
                                onClick={() => alert('Forgot Password logic here')}
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <button type="submit" className="login-button">Login</button>
                        {message && (
                            <p className="login-message" style={{ color: success ? 'green' : 'red' }}>
                                {message}
                            </p>
                        )}
                        <p className="login-footer">Powered by Your Company</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
