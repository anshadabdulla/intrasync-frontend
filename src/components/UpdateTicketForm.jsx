import React, { useEffect, useState } from 'react';
import '../assets/styles/createTicketForm.css';
import { getTicketById, updateTicket } from '../api/ticketService';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const categories = ['Bug', 'Feature Request', 'Support', 'Other'];
const priorities = ['Low', 'Medium', 'High'];
const statuses = {
    0: 'Pending',
    1: 'Resolved',
    2: 'Rejected',
    3: 'On Hold',
    4: 'Revoked'
};

const UpdateTicketForm = ({ onClose, onSuccess }) => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: '' });

    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserType(decoded.user_type?.toLowerCase() || '');
            setUserId(decoded.id); // Adjust if your token uses `userId` instead
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTicketById(id);
                if (res.data.status) {
                    setForm(res.data.data);
                } else {
                    setError('Failed to fetch ticket data.');
                }
            } catch (err) {
                setError('Server error while fetching data.');
            }
        };
        fetchData();
    }, [id]);

    const showToast = (msg) => {
        setToast({ visible: true, message: msg });
        setTimeout(() => setToast({ visible: false, message: '' }), 4000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const updatedForm = {
                ...form,
                status: userType === 'hr' ? form.status : 0 // Set to 0 if not HR
            };

            const res = await updateTicket(id, updatedForm);
            if (res.data.status) {
                showToast('Ticket updated successfully!');
                setTimeout(() => {
                    onSuccess(); // Refresh or navigate
                }, 1000);
            } else {
                showToast(res.data.errors?.[0] || res.data.msg || 'Update failed.');
            }
        } catch (err) {
            showToast(err.response?.data?.errors?.[0] || err.response?.data?.msg || 'Server error.');
        } finally {
            setLoading(false);
        }
    };

    if (!form) return <div className="loading-message">Loading ticket data...</div>;

    const isEditable = userType === 'hr' || (form.status === 0 && form.created_by_id === userId);

    return (
        <div className="page-wrapper">
            <div className="form-section">
                <h2 className="section-title">Update Ticket</h2>
                <div className="form-body">
                    <form className="grid-form" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Ticket Information</legend>
                            <div className="grid-container">
                                <input
                                    name="title"
                                    value={form.title || ''}
                                    placeholder="Title"
                                    onChange={handleChange}
                                    required
                                    disabled={!isEditable}
                                />

                                <select
                                    name="category"
                                    value={form.category || ''}
                                    onChange={handleChange}
                                    required
                                    disabled={!isEditable}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="priority"
                                    value={form.priority || ''}
                                    onChange={handleChange}
                                    required
                                    disabled={!isEditable}
                                >
                                    <option value="">Select Priority</option>
                                    {priorities.map((pri) => (
                                        <option key={pri} value={pri}>
                                            {pri}
                                        </option>
                                    ))}
                                </select>

                                {userType === 'hr' && (
                                    <select name="status" value={form.status ?? 0} onChange={handleChange} required>
                                        <option value="">Select Status</option>
                                        {Object.entries(statuses).map(([key, label]) => (
                                            <option key={key} value={key}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                <div className="textarea-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        value={form.description || ''}
                                        placeholder="Enter description"
                                        rows="4"
                                        onChange={handleChange}
                                        required
                                        disabled={!isEditable}
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {error && <div className="form-error">{error}</div>}

                        <div className="form-actions">
                            <button type="button" className="btn cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="btn secondary" type="button" disabled>
                                Save & Exit
                            </button>
                            <button className="btn primary" type="submit" disabled={loading || !isEditable}>
                                {loading ? 'Saving...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {toast.visible && (
                <div className="toast-popup">
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default UpdateTicketForm;
