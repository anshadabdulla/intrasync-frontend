import React, { useState, useRef, useEffect } from 'react';

const DashboardHeader = ({ employee, onResetPassword, onLogout }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div className="dashboard-header">
            <div className="welcome-msg">
                <h2>Welcome, {employee?.name}</h2>
                <p>{employee?.designation ? employee.designation : ''}</p>
            </div>
            <div className="nav-actions">
                {/* Example nav buttons, adjust as needed */}
                <button className="nav-btn active">Dashboard</button>
                <button className="nav-btn">Welcome</button>
                <button className="nav-btn">Calendar</button>
                {/* Profile Dropdown */}
                <div className="profile-menu" ref={menuRef}>
                    <button className="profile-btn" onClick={() => setOpen((v) => !v)}>
                        <span className="profile-avatar">
                            <i className="fa fa-user-circle" style={{ fontSize: 28 }} />
                        </span>
                        <span className="profile-name">
                            {employee?.name}
                            <span className="profile-role">{employee?.designation}</span>
                        </span>
                        <i className="fa fa-chevron-down" style={{ marginLeft: 8 }} />
                    </button>
                    {open && (
                        <div className="profile-dropdown">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onResetPassword();
                                }}
                            >
                                <i className="fa fa-key" /> Reset Password
                            </button>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onLogout();
                                }}
                            >
                                <i className="fa fa-sign-out" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
