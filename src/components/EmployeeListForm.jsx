import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAllEmployees } from '../api/employeeService';
import './../assets/styles/employeeList.css';

const EmployeeList = () => {
    const [search, setSearch] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [reporting, setReporting] = useState('');
    const [status, setStatus] = useState('');
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dropdownRef = useRef(null);

    const statusOptions = {
        0: 'Resigned',
        1: 'Active',
        2: 'Notice Period',
        3: 'Long Leave'
    };

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError('');

        const delay = new Promise((resolve) => setTimeout(resolve, 400));

        try {
            const [res] = await Promise.all([
                getAllEmployees({
                    name: search,
                    designation,
                    department,
                    status,
                    page: 1,
                    pageSize: 10
                }),
                delay
            ]);

            if (res.data.status) {
                setEmployees(res.data.data);
                setSelectedEmployees([]); // clear selection on fetch
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setStatusDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = () => {
        fetchEmployees();
    };

    const handleReset = () => {
        setSearch('');
        setDesignation('');
        setDepartment('');
        setReporting('');
        setStatus('');
        setSelectedEmployees([]);
        setTimeout(() => {
            fetchEmployees();
        }, 0);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedEmployees(employees.map((emp) => emp.id));
        } else {
            setSelectedEmployees([]);
        }
    };

    const handleSelectOne = (id, checked) => {
        setSelectedEmployees((prev) => (checked ? [...prev, id] : prev.filter((empId) => empId !== id)));
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

                <div className="dropdown" ref={dropdownRef}>
                    <button className="dropdown-toggle" onClick={() => setStatusDropdownOpen((prev) => !prev)}>
                        {statusOptions[status] || 'Employment Status'}
                        <span className="dropdown-arrow">▾</span>
                    </button>
                    {statusDropdownOpen && (
                        <ul className="dropdown-menu show">
                            {Object.entries(statusOptions).map(([value, label]) => (
                                <li
                                    key={value}
                                    onClick={() => {
                                        setStatus(value);
                                        setStatusDropdownOpen(false);
                                    }}
                                >
                                    {label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button className="search-btn" onClick={handleSearch}>
                    Search
                </button>
                <button className="reset-btn" onClick={handleReset}>
                    Reset
                </button>
            </div>

            {loading ? (
                <div className="loader-wrapper">
                    <div className="loader-dots">
                        <span></span>
                    </div>
                </div>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : employees.length === 0 ? (
                <p>No employees found.</p>
            ) : (
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={employees.length > 0 && selectedEmployees.length === employees.length}
                                    indeterminate={
                                        selectedEmployees.length > 0 && selectedEmployees.length < employees.length
                                    }
                                />
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
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployees.includes(emp.id)}
                                        onChange={(e) => handleSelectOne(emp.id, e.target.checked)}
                                    />
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
