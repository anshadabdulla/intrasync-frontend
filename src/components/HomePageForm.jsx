import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getEmployeeById, logout } from '../api/employeeService';
import '../assets/styles/loginForm.css';
import illustration from '../assets/images/illustrations.png';

const HomePageForm = () => {
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return navigate('/');

                const payload = jwtDecode(token);
                const userId = payload.userId;

                const res = await getEmployeeById(userId);

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

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-illustration">
                    <img src={illustration} alt="Welcome" />
                </div>
                <div className="login-container">
                    <div className="login-form">
                        <h2 className="login-title">Welcome, {employee?.name || 'Employee'}!</h2>
                        <p className="login-subtitle">Employee No: {employee?.employee_no}</p>
                        <p
                            style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                color: '#4b5563'
                            }}
                        >
                            Email: {employee?.email}
                        </p>
                        <button
                            className="login-button"
                            onClick={async () => {
                                try {
                                    await logout();
                                } catch (err) {
                                    console.error('Logout failed:', err);
                                } finally {
                                    localStorage.removeItem('token');
                                    navigate('/');
                                }
                            }}
                            style={{ marginTop: '30px' }}
                        >
                            Logout
                        </button>
                        <p className="login-footer">Powered by Your Company</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageForm;
