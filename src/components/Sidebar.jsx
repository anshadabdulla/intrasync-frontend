import React from 'react';
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

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleToggle = (e) => {
        e.preventDefault();
        toggleSidebar();
    };

    const handleNavigate = (e, to) => {
        e.stopPropagation();
        navigate(to);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-logo">
                <i className="fa-solid fa-bars" onClick={handleToggle} style={{ cursor: 'pointer' }} />
                {isOpen && <span className="logo-text"> Intrasync </span>}
            </div>

            <div className="sidebar-menu">
                {menuItems.map((item) => (
                    <div key={item.label} className={`sidebar-item ${location.pathname === item.to ? 'active' : ''}`}>
                        <div className="icon-wrapper" title={item.label} onClick={handleToggle}>
                            <i className={`fa-solid ${item.icon}`} />
                        </div>
                        {isOpen && (
                            <div className="label-wrapper" onClick={(e) => handleNavigate(e, item.to)}>
                                {item.label}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
