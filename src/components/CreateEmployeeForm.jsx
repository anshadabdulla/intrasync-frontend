import React, { useState, useEffect } from 'react';
import '../assets/styles/createEmployeeForm.css';
import { createEmployee, getAllEmployees, getAllDepartments, getAllDesignations } from '../api/employeeService';

const CreateEmployeeForm = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({
        employee_no: '',
        prefix: '',
        name: '',
        mname: '',
        lname: '',
        residential_address: '',
        permenent_address: '',
        father_name: '',
        email: '',
        department: '',
        designation: '',
        teamlead: '',
        doj: '',
        mobile: '',
        ctc_salary: '',
        nationality: '',
        gender: '',
        marital_status: '',
        blood_group: '',
        emergency_phone: '',
        relation: '',
        stay_in: '',
        distance_from_office: '',
        probation: ''
    });

    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [teamleads, setTeamleads] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [deptRes, desigRes, empRes] = await Promise.all([
                    getAllDepartments(),
                    getAllDesignations(),
                    getAllEmployees()
                ]);
                if (deptRes.data.status) setDepartments(deptRes.data.data);
                if (desigRes.data.status) setDesignations(desigRes.data.data);
                if (empRes.data.status) setTeamleads(empRes.data.data);
            } catch (err) {
                console.error('Dropdown load error:', err);
            }
        };

        fetchDropdowns();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await createEmployee(form);
            if (res.data.status) {
                onSuccess();
            } else {
                setError(res.data.errors?.[0] || 'Failed to create employee.');
            }
        } catch (err) {
            setError(err.response?.data?.errors?.[0] || 'Server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="form-section">
                <h2 className="section-title">Add Employee</h2>

                <div className="form-body">
                    <form className="grid-form" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Employee Information</legend>
                            <div className="grid-container">
                                <input name="employee_no" placeholder="Employee ID" onChange={handleChange} required />
                                <select name="prefix" onChange={handleChange} required>
                                    <option value="">Select Prefix</option>
                                    <option>Mr</option>
                                    <option>Mrs</option>
                                    <option>Ms</option>
                                    <option>Dr</option>
                                </select>
                                <input name="name" placeholder="First Name" onChange={handleChange} required />
                                <input name="mname" placeholder="Middle Name" onChange={handleChange} />
                                <input name="lname" placeholder="Last Name" onChange={handleChange} required />

                                <div className="textarea-group">
                                    <label htmlFor="residential_address">Residential Address</label>
                                    <textarea
                                        name="residential_address"
                                        id="residential_address"
                                        placeholder="Enter residential address"
                                        rows="3"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="textarea-group">
                                    <label htmlFor="permenent_address">Permanent Address</label>
                                    <textarea
                                        name="permenent_address"
                                        id="permenent_address"
                                        placeholder="Enter permanent address"
                                        rows="3"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <input
                                    name="father_name"
                                    placeholder="Father's Name"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email ID"
                                    onChange={handleChange}
                                    required
                                />
                                <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
                                <input name="ctc_salary" placeholder="CTC Salary" onChange={handleChange} />
                                <select name="nationality" onChange={handleChange} required>
                                    <option value="">Select Nationality</option>
                                    <option>Indian</option>
                                    <option>Other</option>
                                </select>
                                <select name="gender" onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                                <select name="marital_status" onChange={handleChange} required>
                                    <option value="">Select Marital Status</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>Divorced</option>
                                    <option>Widowed</option>
                                </select>
                                <select name="blood_group" onChange={handleChange}>
                                    <option value="">Select Blood Group</option>
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </select>
                                <input
                                    name="emergency_phone"
                                    placeholder="Emergency Contact"
                                    onChange={handleChange}
                                    required
                                />
                                <select name="relation" onChange={handleChange}>
                                    <option value="">Select Relation</option>
                                    <option>Father</option>
                                    <option>Mother</option>
                                    <option>Spouse</option>
                                    <option>Sibling</option>
                                    <option>Friend</option>
                                </select>
                                <select name="stay_in" onChange={handleChange}>
                                    <option value="">Select Stay In</option>
                                    <option>Hostel</option>
                                    <option>Home</option>
                                    <option>PG</option>
                                </select>
                                <input
                                    name="distance_from_office"
                                    placeholder="Distance From Office (KM)"
                                    onChange={handleChange}
                                />
                                <input
                                    name="doj"
                                    type="date"
                                    placeholder="Date of Joining"
                                    onChange={handleChange}
                                    required
                                />

                                <select name="teamlead" onChange={handleChange}>
                                    <option value="">Select Team Lead</option>
                                    {teamleads.map((emp) => (
                                        <option key={emp.id} value={emp.employee_no}>
                                            {emp.name} ({emp.employee_no})
                                        </option>
                                    ))}
                                </select>

                                <select name="department" onChange={handleChange} required>
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.name}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>

                                <select name="designation" onChange={handleChange} required>
                                    <option value="">Select Designation</option>
                                    {designations.map((desig) => (
                                        <option key={desig.id} value={desig.name}>
                                            {desig.name}
                                        </option>
                                    ))}
                                </select>

                                <select name="probation" onChange={handleChange}>
                                    <option value="">On Probation?</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </fieldset>

                        {error && <div className="form-error">{error}</div>}

                        <div className="form-actions">
                            <button type="button" className="btn cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="btn secondary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save & Exit'}
                            </button>
                            <button className="btn primary" type="submit" disabled={loading}>
                                {loading ? 'Saving...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeForm;
