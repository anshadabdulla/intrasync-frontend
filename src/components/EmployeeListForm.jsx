import React from 'react';
import './../assets/styles/employeeList.css';

const employees = [
    {
        id: 'ZT2075',
        name: 'Mr. Jonas K P',
        gender: 'Male',
        designation: 'Trainer',
        department: 'Vision 2030',
        mobile: '+919876543210',
        reporting: 'Rithika Raj'
    },
    {
        id: 'ZT2074',
        name: 'Mr. Anshad Abdulla',
        gender: 'Male',
        designation: '',
        department: '',
        mobile: '1234567891',
        reporting: ''
    },
    {
        id: 'ZT2073',
        name: 'Mr. Anshad Muruda',
        gender: 'Male',
        designation: '',
        department: '',
        mobile: '1234567891',
        reporting: ''
    },
    {
        id: 'ZT2072',
        name: 'Ms. Ammu A Joy',
        gender: 'Female',
        designation: 'Entry Level',
        department: 'Vision 2030',
        mobile: '09447346913',
        reporting: 'Rithika Raj'
    },
    {
        id: 'ZT2071',
        name: 'Ms. Jinx Jin X',
        gender: 'Female',
        designation: 'Junior Developer',
        department: 'Python',
        mobile: '+919544654503',
        reporting: 'Rithika Raj'
    }
];

const EmployeeList = () => {
    return (
        <div className="employee-container">
            <div className="header">
                <h2>Employee Directory</h2>
                <button className="add-btn">+ Add Employee</button>
            </div>

            <div className="filters">
                <input placeholder="Search by Name / Email / ID" />
                <select>
                    <option>Select Designation</option>
                </select>
                <select>
                    <option>Select Department</option>
                </select>
                <select>
                    <option>Select Gender</option>
                </select>
                <select>
                    <option>Reporting Manager</option>
                </select>
                <select>
                    <option>Employment Status</option>
                </select>
                <select>
                    <option>Category</option>
                </select>
                <button className="search-btn">Search</button>
                <button className="reset-btn">Reset</button>
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" aria-label="Select all" />
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
                                <input type="checkbox" aria-label={`Select ${emp.name}`} />
                            </td>
                            <td>{index + 1}</td>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.designation || '-'}</td>
                            <td>{emp.department || '-'}</td>
                            <td>{emp.mobile}</td>
                            <td>{emp.reporting || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
