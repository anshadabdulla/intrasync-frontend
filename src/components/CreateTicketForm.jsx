import React, { useState } from 'react';
import '../assets/styles/createTicketForm.css';
import { createTicket } from '../api/ticketService';

const CreateTicketForm = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({
        title: '',
        category: '',
        priority: '',
        description: ''
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
            const res = await createTicket(form);
            if (res.data.status) {
                onSuccess();
            } else {
                setError(res.data.msg || res.data.errors?.[0] || 'Failed to create ticket.');
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
                <h2 className="section-title">Create Ticket</h2>
                <div className="form-body">
                    <form className="grid-form" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Ticket Information</legend>
                            <div className="grid-container">
                                <input name="title" placeholder="Title" onChange={handleChange} required />
                                <select name="category" onChange={handleChange} required>
                                    <option value="">Select Category</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Feature Request">Feature Request</option>
                                    <option value="Support">Support</option>
                                    <option value="Other">Other</option>
                                </select>
                                <select name="priority" onChange={handleChange} required>
                                    <option value="">Select Priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <div className="textarea-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        placeholder="Enter description"
                                        rows="4"
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </fieldset>

                        {error && <div className="form-error">{error}</div>}

                        <div className="form-actions">
                            <button type="button" className="btn cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="btn secondary" type="submit" disabled={loading}>
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

export default CreateTicketForm;
