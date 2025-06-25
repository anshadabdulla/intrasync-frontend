import React, { useState } from 'react';
import { createEmployee } from '../api/employeeService';
import '../assets/styles/createEmployeeForm.css';

const CreateEmployeeForm = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({
        employee_no: '',
        name: '',
        email: '',
        mobile: '',
        gender: '',
        permenent_address: '',
        residential_address: '',
        department: '',
        designation: '',
        teamlead: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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
        <div className="modal-overlay">
            <div className="modal-content">
                <form className="create-employee-form" onSubmit={handleSubmit}>
                    <h2>Create New Employee</h2>

                    <label htmlFor="employee_no">Employee No</label>
                    <input id="employee_no" name="employee_no" onChange={handleChange} required />

                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name" onChange={handleChange} required />

                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" onChange={handleChange} required />

                    <label htmlFor="mobile">Mobile</label>
                    <input id="mobile" name="mobile" onChange={handleChange} required />

                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" value={form.gender} onChange={handleChange} required>
                        <option value="" disabled hidden>
                            Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="permenent_address">Permanent Address</label>
                    <textarea
                        id="permenent_address"
                        name="permenent_address"
                        rows={3}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="residential_address">Residential Address</label>
                    <textarea
                        id="residential_address"
                        name="residential_address"
                        rows={3}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="department">Department ID</label>
                    <input id="department" name="department" onChange={handleChange} />

                    <label htmlFor="designation">Designation ID</label>
                    <input id="designation" name="designation" onChange={handleChange} />

                    <label htmlFor="teamlead">Team Lead ID</label>
                    <input id="teamlead" name="teamlead" onChange={handleChange} />

                    {error && <div className="form-error">{error}</div>}

                    <button className="btn" type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Create'}
                    </button>
                    <button type="button" className="btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEmployeeForm;
