import React from 'react';
import logo from './../assets/images/logo.png';

const menuItems = [
    { icon: 'fa-solid fa-house', label: 'Dashboard' },
    { icon: 'fa-solid fa-user', label: 'Employee' },
    { icon: 'fa-solid fa-folder', label: 'Documents' },
    { icon: 'fa-solid fa-calendar-days', label: 'Attendance' }
];

const Sidebar = ({ isOpen, toggleSidebar }) => (
    <div className={`sidebar${isOpen ? ' open' : ''}`}>
        <div className="sidebar-logo">
            <img
                src={logo}
                alt="logo"
                width="40"
                style={{ verticalAlign: 'middle', marginRight: isOpen ? 10 : 0, transition: 'margin 0.3s' }}
            />
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <i className={`fa-solid ${isOpen ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
        </button>
        <ul className="sidebar-menu">
            {menuItems.map((item) => (
                <li className="sidebar-item" key={item.label}>
                    <span className="sidebar-icon">
                        <i className={item.icon} />
                    </span>
                    <span className="sidebar-text">{item.label}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default Sidebar;
