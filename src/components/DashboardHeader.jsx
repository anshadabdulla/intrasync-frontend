import React, { useState, useRef, useEffect } from 'react';

const DashboardHeader = ({ employee, onResetPassword, onLogout }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderAvatar = () => {
        const photoDoc = employee?.documents?.find((doc) => doc.type === 'photo' && doc.file?.trim());

        return photoDoc ? (
            <img
                src={photoDoc.file}
                alt="Profile"
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    background: '#f3f6fa',
                    border: '2px solid #e0e7ef',
                    marginRight: 8
                }}
            />
        ) : (
            <span style={{ fontSize: 28, marginRight: 8 }}>👤</span>
        );
    };

    return (
        <div className="dashboard-header">
            <div className="welcome-msg">
                <h2>Welcome, {employee?.name}</h2>
                <p>{employee?.designation || ''}</p>
            </div>

            <div className="nav-actions">
                <button className="nav-btn active">Dashboard</button>
                <button className="nav-btn">Welcome</button>
                <button className="nav-btn">Calendar</button>

                <div className="profile-menu" ref={menuRef}>
                    <button className="profile-btn" onClick={() => setOpen(!open)}>
                        <span className="profile-avatar">{renderAvatar()}</span>
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
                                Reset Password
                            </button>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onLogout();
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
