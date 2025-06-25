import React, { useState, useEffect, useCallback } from 'react';
import { getAllEmployees } from '../api/employeeService';
import './../assets/styles/employeeList.css';

const EmployeeList = () => {
    const [search, setSearch] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [reporting, setReporting] = useState('');
    const [status, setStatus] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await getAllEmployees({
                name: search,
                designation,
                department,
                category: status,
                page: 1,
                pageSize: 10
            });

            if (res.data.status) {
                setEmployees(res.data.data);
            } else {
                setEmployees([]);
                setError(res.data.msg || 'Failed to fetch employees');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Server error');
        } finally {
            setLoading(false);
        }
    }, [search, designation, department, status]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleSearch = () => {
        fetchEmployees();
    };

    const handleReset = () => {
        setSearch('');
        setDesignation('');
        setDepartment('');
        setReporting('');
        setStatus('');
        setTimeout(fetchEmployees, 0);
    };

    return (
        <div className="employee-container">
            <div className="header">
                <h2>Employee Directory</h2>
                <button className="add-btn">+ Add Employee</button>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by Name / Email / ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                    <option value="">Select Designation</option>
                </select>
                <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option value="">Select Department</option>
                </select>
                <select value={reporting} onChange={(e) => setReporting(e.target.value)}>
                    <option value="">Reporting Manager</option>
                </select>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Employment Status</option>
                </select>
                <button className="search-btn" onClick={handleSearch}>
                    Search
                </button>
                <button className="reset-btn" onClick={handleReset}>
                    Reset
                </button>
            </div>

            {loading ? (
                <p>Loading employees...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>SL.NO</th>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Mobile</th>
                            <th>Reporting To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={emp.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{index + 1}</td>
                                <td>{emp.employee_no || '-'}</td>
                                <td>{emp.full_name || '-'}</td>
                                <td>{emp.gender || '-'}</td>
                                <td>{emp.Designation?.name || '-'}</td>
                                <td>{emp.Department?.name || '-'}</td>
                                <td>{emp.mobile || '-'}</td>
                                <td>{emp.TeamLead?.name || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeList;
