import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getEmployeeById, logout } from '../api/employeeService';

import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import ResetPassword from '../components/ResetPassword';
import CreateTicketForm from '../components/CreateTicketForm';
import '../assets/styles/homePage.css';

const CreateTicketPage = () => {
    const [employee, setEmployee] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [showScreenLoader, setShowScreenLoader] = useState(false);

    const navigate = useNavigate();
    const layoutRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return navigate('/');

                const payload = jwtDecode(token);
                const res = await getEmployeeById(payload.userId);

                if (res.data.status) {
                    setEmployee(res.data.data);
                }
            } catch (err) {
                console.error(err);
                navigate('/');
            }
        };
        fetchData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            setShowScreenLoader(true);
            await logout();
            localStorage.removeItem('token');
            setTimeout(() => navigate('/'), 800);
        } catch (err) {
            console.error('Logout failed:', err);
            setShowScreenLoader(false);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebarEl = document.querySelector('.sidebar');
            if (
                isSidebarOpen &&
                sidebarEl &&
                !sidebarEl.contains(event.target) &&
                !event.target.closest('.sidebar-toggle')
            ) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    if (showScreenLoader) {
        return (
            <div className="screen-loader">
                <div className="loader-dots screen">
                    <span></span>
                </div>
            </div>
        );
    }

    return (
        <div className="layout-container" ref={layoutRef}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`dashboard-container ${isSidebarOpen ? 'shrink' : ''}`}>
                <DashboardHeader
                    employee={employee}
                    onLogout={handleLogout}
                    onResetPassword={() => setShowReset(true)}
                />
                <div className="page-content">
                    <CreateTicketForm
                        onSuccess={() => navigate('/ticket-list')}
                        onClose={() => navigate('/ticket-list')}
                    />
                </div>
            </div>

            {showReset && (
                <div className="modal-overlay" onClick={() => setShowReset(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <ResetPassword />
                        <button
                            className="btn"
                            style={{ marginTop: 16, background: '#ef4444' }}
                            onClick={() => setShowReset(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTicketPage;
