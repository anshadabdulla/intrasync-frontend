import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getEmployeeById, logout } from '../api/employeeService';
import '../assets/styles/homePage.css';

import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import CardsSummary from './CardsSummary';
import EmployeeInfo from './EmployeeInfo';
import AttendanceSection from './AttendanceSection';
import LogoutSection from './LogoutSection';

const HomePageForm = () => {
    const [employee, setEmployee] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

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

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div className="layout-container">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`dashboard-container ${isSidebarOpen ? 'shrink' : ''}`}>
                <DashboardHeader employee={employee} />
                <CardsSummary />
                <EmployeeInfo employee={employee} />
                <AttendanceSection />
                <LogoutSection onLogout={handleLogout} />
            </div>
        </div>
    );
};

export default HomePageForm;
