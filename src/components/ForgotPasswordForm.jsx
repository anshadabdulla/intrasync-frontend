import React, { useState } from 'react';
import { forgotPassword } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/loginForm.css';
import illustration from '../assets/images/illustrations.png';
import logo from '../assets/images/logo.png';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSuccess(false);
        try {
            const res = await forgotPassword(email);
            if (res.data.status) {
                setSuccess(true);
                setMessage('Email sent successfully!');
            } else {
                setMessage(res.data.data || 'Failed to send email.');
            }
        } catch (err) {
            setMessage(err.response?.data?.data || 'Server error.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-illustration">
                    <img src={illustration} alt="Forgot Password Illustration" />
                </div>
                <div className="login-container">
                    <form onSubmit={handleSubmit} className="login-form">
                        <img src={logo} alt="Company Logo" className="company-logo" />
                        <h2 className="login-title">Forgot Password</h2>
                        <p className="login-subtitle">Enter your email to receive reset instructions</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                        <button type="submit" className="login-button">Send Reset Link</button>
                        <button
                            type="button"
                            className="link-button"
                            onClick={() => navigate('/')}
                            style={{ marginTop: '8px' }}
                        >
                            &larr; Back to Login
                        </button>
                        <p
                            className={`login-message ${message ? 'visible' : ''}`}
                            style={{ color: success ? 'green' : 'red' }}
                        >
                            {message}
                        </p>
                        <p className="login-footer">Powered by Intrasync</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
