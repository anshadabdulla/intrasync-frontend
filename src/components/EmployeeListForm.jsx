import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAllEmployees, getAllDepartments, getAllDesignations, getAllEmployeeTL } from '../api/employeeService';
import { useNavigate } from 'react-router-dom';
import './../assets/styles/employeeList.css';
import { jwtDecode } from 'jwt-decode';

const EmployeeList = () => {
    const [search, setSearch] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [teamlead, setTeamlead] = useState('');
    const [reporting, setReporting] = useState('');
    const [status, setStatus] = useState('');
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [designationDropdownOpen, setDesignationDropdownOpen] = useState(false);
    const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
    const [teamleadDropdownOpen, setTeamleadDropdownOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [designationList, setDesignationList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [teamleadList, setTeamleadList] = useState([]);
    const [resetTriggered, setResetTriggered] = useState(false);

    const dropdownRef = useRef(null);
    const designationDropdownRef = useRef(null);
    const departmentDropdownRef = useRef(null);
    const teamleadDropdownRef = useRef(null);
    const selectAllRef = useRef(null);
    const navigate = useNavigate();

    let userType = '';
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            userType = decoded.user_type?.toLowerCase();
        }
    } catch (error) {
        console.error('Invalid token:', error);
    }

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
                    reporting,
                    teamlead,
                    status,
                    page: 1,
                    pageSize: 10
                }),
                delay
            ]);

            if (res.data.status) {
                setEmployees(res.data.data);
                setSelectedEmployees([]);
            } else {
                setEmployees([]);
                setError(res.data.msg || 'Failed to fetch employees');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Server error');
        } finally {
            setLoading(false);
        }
    }, [search, designation, department, reporting, status, teamlead]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setStatusDropdownOpen(false);
            }
            if (designationDropdownRef.current && !designationDropdownRef.current.contains(event.target)) {
                setDesignationDropdownOpen(false);
            }
            if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target)) {
                setDepartmentDropdownOpen(false);
            }
            if (teamleadDropdownRef.current && !teamleadDropdownRef.current.contains(event.target)) {
                setTeamleadDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [designationRes, departmentRes, teamleadRes] = await Promise.all([
                    getAllDesignations(),
                    getAllDepartments(),
                    getAllEmployeeTL()
                ]);
                if (designationRes.data.status) setDesignationList(designationRes.data.data);
                if (departmentRes.data.status) setDepartmentList(departmentRes.data.data);
                if (teamleadRes.data.status) setTeamleadList(teamleadRes.data.data);
            } catch (err) {
                console.error('Dropdown load error:', err);
            }
        };
        fetchDropdownData();
    }, []);

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate =
                selectedEmployees.length > 0 && selectedEmployees.length < employees.length;
        }
    }, [selectedEmployees, employees]);

    useEffect(() => {
        if (resetTriggered) {
            fetchEmployees();
            setResetTriggered(false);
        }
    }, [resetTriggered, fetchEmployees]);

    const handleSearch = () => fetchEmployees();

    const handleReset = () => {
        setSearch('');
        setDesignation('');
        setDepartment('');
        setTeamlead('');
        setReporting('');
        setStatus('');
        setSelectedEmployees([]);
        setResetTriggered(true);
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
                {userType === 'hr' && (
                    <button className="add-btn" onClick={() => navigate('/employe-create')}>
                        + Add Employee
                    </button>
                )}
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by Name / ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="dropdown" ref={designationDropdownRef}>
                    <button className="dropdown-toggle" onClick={() => setDesignationDropdownOpen((prev) => !prev)}>
                        {designationList.find((d) => d.id === designation)?.name || 'Select Designation'}
                        <span className="dropdown-arrow">▾</span>
                    </button>
                    {designationDropdownOpen && (
                        <ul className="dropdown-menu show">
                            {designationList.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => {
                                        setDesignation(item.id);
                                        setDesignationDropdownOpen(false);
                                    }}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="dropdown" ref={departmentDropdownRef}>
                    <button className="dropdown-toggle" onClick={() => setDepartmentDropdownOpen((prev) => !prev)}>
                        {departmentList.find((d) => d.id === department)?.name || 'Select Department'}
                        <span className="dropdown-arrow">▾</span>
                    </button>
                    {departmentDropdownOpen && (
                        <ul className="dropdown-menu show">
                            {departmentList.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => {
                                        setDepartment(item.id);
                                        setDepartmentDropdownOpen(false);
                                    }}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="dropdown" ref={teamleadDropdownRef}>
                    <button className="dropdown-toggle" onClick={() => setTeamleadDropdownOpen((prev) => !prev)}>
                        {teamleadList.find((d) => d.id === teamlead)?.name || 'Reporting To'}
                        <span className="dropdown-arrow">▾</span>
                    </button>
                    {teamleadDropdownOpen && (
                        <ul className="dropdown-menu show">
                            {teamleadList.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => {
                                        setTeamlead(item.id);
                                        setTeamleadDropdownOpen(false);
                                    }}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

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
                                    ref={selectAllRef}
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={employees.length > 0 && selectedEmployees.length === employees.length}
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
