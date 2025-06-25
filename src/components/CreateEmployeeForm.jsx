import React, { useState } from 'react';
import '../assets/styles/createEmployeeForm.css';
import { createEmployee } from '../api/employeeService';

const CreateEmployeeForm = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({
        employee_no: '',
        prefix: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        father_name: '',
        email: '',
        mobile: '',
        ctc: '',
        nationality: '',
        dob: '',
        gender: '',
        marital_status: '',
        blood_group: '',
        emergency_contact: '',
        relation: '',
        stay_in: '',
        distance: '',
        doj: '',
        doc: '',
        on_probation: '',
        probation_days: '',
        employment_type: '',
        contract_from: '',
        contract_to: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
                <form className="grid-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Employee Information</legend>
                        <div className="grid-container">
                            <input name="employee_no" placeholder="Employee ID" onChange={handleChange} required />
                            <select name="prefix" onChange={handleChange} required>
                                <option value="">Select Prefix</option>
                                <option>Mr</option>
                                <option>Mrs</option>
                            </select>
                            <input name="first_name" placeholder="First Name" onChange={handleChange} required />
                            <input name="middle_name" placeholder="Middle Name" onChange={handleChange} />
                            <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
                            <input name="father_name" placeholder="Father's Name" onChange={handleChange} required />
                            <input name="email" type="email" placeholder="Email ID" onChange={handleChange} required />
                            <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
                            <input name="ctc" placeholder="Current CTC" onChange={handleChange} />
                            <select name="nationality" onChange={handleChange} required>
                                <option value="">Select Nationality</option>
                                <option>Indian</option>
                                <option>Other</option>
                            </select>
                            <input
                                name="dob"
                                type="date"
                                placeholder="Date of Birth"
                                onChange={handleChange}
                                required
                            />
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
                            </select>
                            <select name="blood_group" onChange={handleChange}>
                                <option value="">Select Blood Group</option>
                                <option>A+</option>
                                <option>B+</option>
                            </select>
                            <input
                                name="emergency_contact"
                                placeholder="Emergency Contact"
                                onChange={handleChange}
                                required
                            />
                            <select name="relation" onChange={handleChange}>
                                <option value="">Select Relation</option>
                                <option>Father</option>
                                <option>Mother</option>
                            </select>
                            <select name="stay_in" onChange={handleChange}>
                                <option value="">Select Stay In</option>
                                <option>Hostel</option>
                                <option>Home</option>
                            </select>
                            <input name="distance" placeholder="Distance From Office (in KM)" onChange={handleChange} />
                            <input
                                name="doj"
                                type="date"
                                placeholder="Date of Joining"
                                onChange={handleChange}
                                required
                            />
                            <input name="doc" type="date" placeholder="Date of Confirmation" onChange={handleChange} />
                            <select name="on_probation" onChange={handleChange}>
                                <option value="">On Probation?</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <input name="probation_days" placeholder="Days" onChange={handleChange} />
                            <input
                                name="employment_type"
                                placeholder="Employment Type"
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="contract_from"
                                type="date"
                                placeholder="Contract From Date"
                                onChange={handleChange}
                            />
                            <input
                                name="contract_to"
                                type="date"
                                placeholder="Contract To Date"
                                onChange={handleChange}
                            />
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
    );
};

export default CreateEmployeeForm;
