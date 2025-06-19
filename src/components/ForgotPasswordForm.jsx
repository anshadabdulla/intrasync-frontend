import React, { useState } from 'react';
import { forgotPassword } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/forgotPasswordForm.css';
import illustration from '../assets/images/illustrations.png';

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
        <div className="forgot-wrapper">
            <div className="forgot-box">
                <div className="forgot-illustration">
                    <img src={illustration} alt="Forgot" />
                </div>
                <div className="forgot-container">
                    <form onSubmit={handleSubmit} className="forgot-form">
                        <h2 className="forgot-title">Forgot Password</h2>
                        <p className="forgot-subtitle">Enter your email to reset password</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="forgot-input"
                        />
                        <button type="submit" className="forgot-button">
                            Send Reset Link
                        </button>
                        <button type="button" className="back-button" onClick={() => navigate('/')}>
                            &larr; Back to Login
                        </button>
                        <p className="forgot-message" style={{ color: success ? 'green' : 'red' }}>
                            {message}
                        </p>
                        <p className="forgot-footer">Powered by Your Company</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
