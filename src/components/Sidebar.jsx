import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
            <img src="/logo192.png" alt="logo" width="40" />
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isOpen ? '«' : '»'}
        </button>
        <ul className="sidebar-menu">
            <li className="sidebar-item">
                <span className="sidebar-icon">🏠</span>
                <span className="sidebar-text">Dashboard</span>
            </li>
            <li className="sidebar-item">
                <span className="sidebar-icon">👤</span>
                <span className="sidebar-text">Employee</span>
            </li>
            <li className="sidebar-item">
                <span className="sidebar-icon">📁</span>
                <span className="sidebar-text">Documents</span>
            </li>
            <li className="sidebar-item">
                <span className="sidebar-icon">📅</span>
                <span className="sidebar-text">Attendance</span>
            </li>
        </ul>
    </div>
);

export default Sidebar;
