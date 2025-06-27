import React, { useEffect, useState } from 'react';
import '../assets/styles/createEmployeeForm.css';
import {
    getEmployeeById,
    updateEmployee,
    getAllEmployees,
    getAllDepartments,
    getAllDesignations
} from '../api/employeeService';
import { useParams } from 'react-router-dom';

const UpdateEmployeeForm = ({ onClose, onSuccess }) => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [teamleads, setTeamleads] = useState([]);

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

        const fetchData = async () => {
            try {
                const res = await getEmployeeById(id);
                if (res.data.status) {
                    setForm(res.data.data);
                } else {
                    setError('Failed to fetch employee data.');
                }
            } catch (err) {
                console.error(err);
                setError('Server error while fetching data.');
            }
        };

        fetchDropdowns();
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await updateEmployee(id, form);
            if (res.data.status) {
                onSuccess();
            } else {
                setError(res.data.errors?.[0] || 'Failed to update employee.');
            }
        } catch (err) {
            setError(err.response?.data?.errors?.[0] || 'Server error.');
        } finally {
            setLoading(false);
        }
    };

    if (!form) {
        return <div className="loading-message">Loading employee data...</div>;
    }

    return (
        <div className="page-wrapper">
            <div className="form-section">
                <h2 className="section-title">Update Employee</h2>

                <div className="form-body">
                    <form className="grid-form" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Employee Information</legend>
                            <div className="grid-container">
                                <input
                                    name="employee_no"
                                    value={form.employee_no}
                                    placeholder="Employee ID"
                                    onChange={handleChange}
                                    required
                                />
                                <select name="prefix" value={form.prefix || ''} onChange={handleChange} required>
                                    <option value="">Select Prefix</option>
                                    <option>Mr</option>
                                    <option>Mrs</option>
                                    <option>Ms</option>
                                    <option>Dr</option>
                                </select>
                                <input
                                    name="name"
                                    value={form.name}
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="mname"
                                    value={form.mname || ''}
                                    placeholder="Middle Name"
                                    onChange={handleChange}
                                />
                                <input
                                    name="lname"
                                    value={form.lname || ''}
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    required
                                />

                                <div className="textarea-group">
                                    <label htmlFor="residential_address">Residential Address</label>
                                    <textarea
                                        name="residential_address"
                                        id="residential_address"
                                        placeholder="Enter residential address"
                                        rows="3"
                                        value={form.residential_address || ''}
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
                                        value={form.permenent_address || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <input
                                    name="father_name"
                                    value={form.father_name || ''}
                                    placeholder="Father's Name"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    placeholder="Email ID"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="mobile"
                                    value={form.mobile || ''}
                                    placeholder="Mobile Number"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="ctc_salary"
                                    value={form.ctc_salary || ''}
                                    placeholder="CTC Salary"
                                    onChange={handleChange}
                                />

                                <select
                                    name="nationality"
                                    value={form.nationality || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Nationality</option>
                                    <option>Indian</option>
                                    <option>Other</option>
                                </select>

                                <select name="gender" value={form.gender || ''} onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>

                                <select
                                    name="marital_status"
                                    value={form.marital_status || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Marital Status</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>Divorced</option>
                                    <option>Widowed</option>
                                </select>

                                <select name="blood_group" value={form.blood_group || ''} onChange={handleChange}>
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
                                    value={form.emergency_phone || ''}
                                    placeholder="Emergency Contact"
                                    onChange={handleChange}
                                    required
                                />

                                <select name="relation" value={form.relation || ''} onChange={handleChange}>
                                    <option value="">Select Relation</option>
                                    <option>Father</option>
                                    <option>Mother</option>
                                    <option>Spouse</option>
                                    <option>Sibling</option>
                                    <option>Friend</option>
                                </select>

                                <select name="stay_in" value={form.stay_in || ''} onChange={handleChange}>
                                    <option value="">Select Stay In</option>
                                    <option>Hostel</option>
                                    <option>Home</option>
                                    <option>PG</option>
                                </select>

                                <input
                                    name="distance_from_office"
                                    value={form.distance_from_office || ''}
                                    placeholder="Distance From Office (KM)"
                                    onChange={handleChange}
                                />

                                <input
                                    name="doj"
                                    type="date"
                                    value={form.doj?.slice(0, 10) || ''}
                                    onChange={handleChange}
                                    required
                                />

                                <select name="teamlead" value={form.teamlead || ''} onChange={handleChange}>
                                    <option value="">Select Team Lead</option>
                                    {teamleads.map((tl) => (
                                        <option key={tl.id} value={tl.employee_no}>
                                            {tl.name} ({tl.employee_no})
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="department"
                                    value={form.department || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.name}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="designation"
                                    value={form.designation || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Designation</option>
                                    {designations.map((desig) => (
                                        <option key={desig.id} value={desig.name}>
                                            {desig.name}
                                        </option>
                                    ))}
                                </select>

                                <select name="probation" value={form.probation || ''} onChange={handleChange}>
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
                                {loading ? 'Saving...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployeeForm;
