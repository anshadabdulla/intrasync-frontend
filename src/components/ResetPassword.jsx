import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/employeeService';

const ResetPassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setError('At least 6 characters.');
            return;
        }

        setLoading(true);
        try {
            const res = await resetPassword(currentPassword, newPassword);
            if (res.data.status) {
                setMessage('Password changed successfully.');
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 1500);
            } else {
                setError(res.data.data || 'Failed to reset password.');
            }
        } catch (err) {
            setError(err.response?.data?.data || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="form-error">{error}</div>}
                {message && <div className="form-success">{message}</div>}
                <button className="btn" type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
