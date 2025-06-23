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
        name: 'Mr anshad abdulla',
        gender: 'Male',
        designation: '',
        department: '',
        mobile: '1234567891',
        reporting: ''
    },
    {
        id: 'ZT2073',
        name: 'Mr anshad muruda',
        gender: 'Male',
        designation: '',
        department: '',
        mobile: '1234567891',
        reporting: ''
    },
    {
        id: 'ZT2072',
        name: 'Ms. Ammu A Joy',
        gender: 'Male',
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
        <div className="employee-list-container">
            <h2>Employees</h2>

            <div className="filter-row">
                <input placeholder="Name/Email/EMP ID" />
                <select>
                    <option>Designation</option>
                </select>
                <select>
                    <option>Department</option>
                </select>
                <select>
                    <option>Gender</option>
                </select>
                <select>
                    <option>Reporting To</option>
                </select>
                <select>
                    <option>Status</option>
                </select>
                <select>
                    <option>Select Category</option>
                </select>
                <button className="search-btn">Search</button>
                <button className="reset-btn">Reset</button>
                <button className="add-btn">+ Add New</button>
            </div>

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
                        <th>Mobile Number</th>
                        <th>Reporting to</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp, index) => (
                        <tr key={emp.id}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>{index + 1}</td>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.department}</td>
                            <td>{emp.mobile}</td>
                            <td>{emp.reporting}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
