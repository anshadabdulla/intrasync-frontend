import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../assets/styles/homePage.css';

const DashboardHeader = ({ employee, onResetPassword, onLogout }) => {
    const [open, setOpen] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const menuRef = useRef();
    const calendarRef = useRef();

    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;

    let headingText = '';
    if (pathname === '/home') {
        headingText = `Welcome, ${employee?.name}`;
    } else if (pathname === '/employe-list') {
        headingText = 'Intrasync ';
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(e.target)) {
                setShowCalendar(false);
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
            <div className="welcome-msg">{headingText && <h2>{headingText}</h2>}</div>

            <div className="nav-actions">
                <button
                    className={`nav-btn ${pathname === '/home' ? 'active' : ''}`}
                    onClick={() => navigate('/home')}
                >
                    Dashboard
                </button>
                <button
                    className={`nav-btn ${pathname === '/employe-list' ? 'active' : ''}`}
                    onClick={() => navigate('/employe-list')}
                >
                    Welcome
                </button>
                <button
                    className={`nav-btn ${showCalendar ? 'active' : ''}`}
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    Calendar
                </button>

                {showCalendar && (
                    <div
                        ref={calendarRef}
                        style={{
                            position: 'absolute',
                            top: '170px',
                            right: window.innerWidth < 500 ? '40px' : '60px',
                            width: window.innerWidth < 400 ? '95vw' : 'auto',
                            maxWidth: '360px',
                            zIndex: 1000,
                            background: 'white',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                            borderRadius: 8,
                            padding: 16
                        }}
                    >
                        <Calendar defaultValue={new Date()} />
                    </div>
                )}

                <div className="profile-menu" ref={menuRef}>
                    <button className="profile-btn" onClick={() => setOpen(!open)}>
                        <span className="profile-avatar">{renderAvatar()}</span>
                        <span className="profile-name">{employee?.name}</span>
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
