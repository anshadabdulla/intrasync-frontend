import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getEmployeeById, logout } from '../api/employeeService';
import '../assets/styles/homePage.css';

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

const CardsSummary = () => (
    <div className="cards-summary">
        <div className="card">
            <span>61</span> Employees
        </div>
        <div className="card">
            <span>11</span> Tickets
        </div>
        <div className="card">
            <span>38</span> Assets
        </div>
        <div className="card">
            <span>1</span> Exam Results
        </div>
    </div>
);

const EmployeeInfo = ({ employee }) => (
    <div className="employee-info">
        <div className="profile-pic">👤</div>
        <div className="info-columns">
            <div className="info-left">
                <div className="info-item">
                    <strong>Designation:</strong> {employee?.designation}
                </div>
                <div className="info-item">
                    <strong>Department:</strong> {employee?.department}
                </div>
                <div className="info-item">
                    <strong>Reporting Manager:</strong> {employee?.reporting_manager}
                </div>
                <div className="info-item">
                    <strong>Score:</strong> 0
                </div>
            </div>
            <div className="info-right">
                <div className="info-item">
                    <strong>Email:</strong> {employee?.email}
                </div>
                <div className="info-item">
                    <strong>Mobile Number:</strong> {employee?.mobile}
                </div>
                <div className="info-item">
                    <strong>Blood Group:</strong> {employee?.blood_group}
                </div>
                <div className="info-item">
                    <strong>Date Of Joining:</strong> {employee?.joining_date}
                </div>
                <div className="info-item">
                    <strong>Address:</strong> {employee?.address}
                </div>
                <div className="info-item">
                    <strong>Gender:</strong> {employee?.gender}
                </div>
                <div className="button-group">
                    <button className="btn">Service Book</button>
                    <button className="btn">My Team</button>
                </div>
            </div>
        </div>
    </div>
);

const AttendanceSection = () => (
    <div className="bottom-section">
        <div className="attendance-box">
            <h4>Attendance</h4>
            <p>July 2025</p>
            <p>Self</p>
            <p style={{ marginTop: '20px' }}>No records to display</p>
        </div>
        <div className="attendance-box">
            <h4>Today's Attendance</h4>
            <p>TH: 0 hrs</p>
            <p style={{ marginTop: '20px' }}>No records to display</p>
        </div>
    </div>
);

const LogoutSection = ({ onLogout }) => (
    <div className="logout-section">
        <button className="logout-btn" onClick={onLogout}>
            Logout
        </button>
    </div>
);

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
