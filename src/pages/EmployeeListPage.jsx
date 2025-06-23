import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getEmployeeById, logout } from '../api/employeeService';

import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import EmployeeListForm from '../components/EmployeeListForm';
import '../assets/styles/homePage.css';

const EmployeeListPage = () => {
    const [employee, setEmployee] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
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
            await logout();
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            localStorage.removeItem('token');
            navigate('/');
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

    return (
        <div className="layout-container" ref={layoutRef}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`dashboard-container ${isSidebarOpen ? 'shrink' : ''}`}>
                <DashboardHeader employee={employee} onLogout={handleLogout} />
                <EmployeeListForm />
            </div>
        </div>
    );
};

export default EmployeeListPage;
