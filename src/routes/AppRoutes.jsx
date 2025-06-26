import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import HomePage from '../pages/HomePage';
import EmployeeListPage from '../pages/EmployeeListPage';
import CreateEmployeePage from '../pages/CreateEmployeePage';
import UpdateEmployeePage from '../pages/UpdateEmployeePage';
import TicketListPage from '../pages/TicketListPage';
import CreateTicketPage from '../pages/CreateTicketPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/employe-list" element={<EmployeeListPage />} />
                <Route path="/employe-create" element={<CreateEmployeePage />} />
                <Route path="/employe-update/:id" element={<UpdateEmployeePage />} />
                <Route path="/ticket-list" element={<TicketListPage />} />
                <Route path="/ticket-create" element={<CreateTicketPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
