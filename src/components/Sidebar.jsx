import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/homePage.css';

const menuItems = [
    { icon: 'fa-chart-line', label: 'Dashboard', to: '/dashboard' },
    { icon: 'fa-users', label: 'Employees', to: '/employees' }, 
    { icon: 'fa-calendar-check', label: 'Daily Updates', to: '/daily-updates' },
    { icon: 'fa-calendar-day', label: 'Events', to: '/events' },
    { icon: 'fa-user-slash', label: 'Resignation', to: '/resignation' },
    { icon: 'fa-ticket-alt', label: 'Tickets', to: '/tickets' },
    { icon: 'fa-file-contract', label: 'Company Policy', to: '/company-policy' }
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleIconClick = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
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
    );
};

export default Sidebar;
