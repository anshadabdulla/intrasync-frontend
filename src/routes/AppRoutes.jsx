import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import HomePage from '../pages/HomePage';
import EmployeeListPage from '../pages/EmployeeListPage';
import CreateEmployeePage from '../pages/CreateEmployeePage';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/employe-list" element={<EmployeeListPage />} />
                <Route path="/employe-create" element={<CreateEmployeePage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
