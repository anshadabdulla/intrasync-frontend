import React from 'react';

const DashboardHeader = ({ employee }) => (
    <div className="dashboard-header">
        <div className="welcome-msg">
            <h2>Welcome, {employee?.name}</h2>
            <p>Employee ID: {employee?.employee_no}</p>
        </div>
        <div className="nav-actions">
            <button className="nav-btn active">Dashboard</button>
            <button className="nav-btn">Welcome</button>
            <button className="nav-btn">Calendar</button>
        </div>
    </div>
);

export default DashboardHeader;
