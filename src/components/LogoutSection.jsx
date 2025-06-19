import React from 'react';

const LogoutSection = ({ onLogout }) => (
    <div className="logout-section">
        <button className="logout-btn" onClick={onLogout}>
            Logout
        </button>
    </div>
);

export default LogoutSection;
