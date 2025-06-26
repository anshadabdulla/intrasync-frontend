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

    const [toast, setToast] = useState({ message: '', visible: false });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const showToast = (message) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast({ message: '', visible: false }), 4000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await createTicket(form);
            if (res.data.status) {
                const token = localStorage.getItem('token');
                const userType = token ? jwtDecode(token).user_type?.toLowerCase() : '';

                if (userType === 'hr') {
                    navigate('/ticket-list');
                } else {
                    navigate('/home');
                }
            } else {
                showToast(res.data.msg || res.data.errors?.[0] || 'Failed to create ticket.');
            }
        } catch (err) {
            const backendMsg = err?.response?.data?.msg || err?.response?.data?.errors?.[0];
            showToast(backendMsg || 'Server error.');
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

            {toast.visible && (
                <div className="toast-popup">
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default CreateTicketForm;
