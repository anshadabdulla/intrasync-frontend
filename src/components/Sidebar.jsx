import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/homePage.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showScreenLoader, setShowScreenLoader] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: 'fa-chart-line', label: 'Dashboard', to: '/home' },
        { icon: 'fa-users', label: 'Employees', to: '/employe-list' },
        { icon: 'fa-calendar-check', label: 'Daily Updates', to: '/daily-updates-list' },
        { icon: 'fa-calendar-alt', label: 'Events', to: '/events' },
        { icon: 'fa-user-slash', label: 'Resignation', to: '/resignation' },
        { icon: 'fa-headset', label: 'Tickets', to: '/ticket-list' },
        { icon: 'fa-gavel', label: 'Company Policy', to: '/company-policy' }
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleIconClick = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigate = (path) => {
        if (location.pathname === path) return;

        if (path !== '/home') {
            setShowScreenLoader(true);
        }

        setTimeout(() => {
            navigate(path);
            setShowScreenLoader(false);
        }, 1000);
    };

    return (
        <>
            {showScreenLoader && (
                <div className="screen-loader">
                    <div className="loader-dots screen">
                        <span></span>
                    </div>
                </div>
            )}

            <div className="sidebar-container">
                <div className="sidebar-icon-panel">
                    <div className="icon-toggle" onClick={toggleSidebar}>
                        <i className="fa-solid fa-bars" />
                    </div>
                    <div className="icon-menu">
                        {menuItems.map((item) => (
                            <div
                                key={item.label}
                                className={`icon-item ${location.pathname === item.to ? 'active' : ''}`}
                                onClick={handleIconClick}
                                title={item.label}
                            >
                                <i className={`fa-solid ${item.icon}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`sidebar-label-panel ${isOpen ? 'open' : ''}`}>
                    {menuItems.map((item) => (
                        <div
                            key={item.label}
                            className={`label-item ${location.pathname === item.to ? 'active' : ''}`}
                            onClick={() => handleNavigate(item.to)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
