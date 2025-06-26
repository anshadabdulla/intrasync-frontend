import React, { useState } from 'react';
import '../assets/styles/createTicketForm.css';
import { createTicket } from '../api/ticketService';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const categories = ['Bug', 'Feature Request', 'Support', 'Other'];
const priorities = ['Low', 'Medium', 'High'];

const CreateTicketForm = ({ onClose }) => {
    const [form, setForm] = useState({
        title: '',
        category: '',
        priority: '',
        description: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                let userType = '';
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    userType = decoded.user_type?.toLowerCase();
                }

                if (userType === 'hr') {
                    navigate('/ticket-list');
                } else {
                    navigate('/home');
                }
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

                                <Listbox
                                    value={form.category}
                                    onChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
                                >
                                    <div className="custom-select">
                                        <Listbox.Button className="custom-select-button">
                                            {form.category || 'Select Category'} <ChevronDown size={16} />
                                        </Listbox.Button>
                                        <Listbox.Options className="custom-select-options">
                                            {categories.map((cat) => (
                                                <Listbox.Option key={cat} value={cat} className="custom-option">
                                                    {cat}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </Listbox>

                                <Listbox
                                    value={form.priority}
                                    onChange={(value) => setForm((prev) => ({ ...prev, priority: value }))}
                                >
                                    <div className="custom-select">
                                        <Listbox.Button className="custom-select-button">
                                            {form.priority || 'Select Priority'} <ChevronDown size={16} />
                                        </Listbox.Button>
                                        <Listbox.Options className="custom-select-options">
                                            {priorities.map((prio) => (
                                                <Listbox.Option key={prio} value={prio} className="custom-option">
                                                    {prio}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </Listbox>

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
