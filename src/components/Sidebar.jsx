import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/homePage.css';

const menuItems = [
    { icon: 'fa-gauge', label: 'Dashboard', to: '/dashboard' },
    { icon: 'fa-user-tie', label: 'HR', to: '/hr' },
    { icon: 'fa-folder', label: 'Documents', to: '/documents' },
    { icon: 'fa-users', label: 'Team', to: '/team' },
    { icon: 'fa-file-lines', label: 'Exam', to: '/exam' },
    { icon: 'fa-laptop-code', label: 'IT', to: '/it' },
    { icon: 'fa-book-open', label: 'Reports', to: '/reports' },
    { icon: 'fa-user-check', label: 'Access', to: '/access' }
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleIconClick = () => {
        setIsOpen(!isOpen); // toggle open/close
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="sidebar-container">
            {/* Fixed Icon Panel */}
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

            {/* Sliding Label Panel */}
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
