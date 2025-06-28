import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/createTicketForm.css';
import { createDailyUpdate } from '../api/dailyUpdateService';
import { CalendarDays, Clock } from 'lucide-react';

const CreateDailyUpdateForm = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        date: '',
        start_time: '',
        end_time: '',
        description: ''
    });

    const [toast, setToast] = useState({ message: '', visible: false });
    const [loading, setLoading] = useState(false);

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
            const res = await createDailyUpdate(form);
            if (res.data.status) {
                navigate('/daily-updates-list');
            } else {
                showToast(res.data.msg || res.data.errors?.[0] || 'Failed to create daily update.');
            }
        } catch (err) {
            const backendMsg = err?.response?.data?.msg || err?.response?.data?.errors?.[0];
            showToast(backendMsg || 'Server error.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/daily-updates-list');
    };

    return (
        <div className="page-wrapper">
            <div className="form-section">
                <h2 className="section-title">Create Daily Update</h2>
                <div className="form-body">
                    <form className="grid-form" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Update Information</legend>
                            <div className="grid-container">
                                <input
                                    name="title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                    value={form.title}
                                    required
                                />

                                <div className="input-icon">
                                    <CalendarDays size={16} />
                                    <input type="date" name="date" onChange={handleChange} value={form.date} required />
                                </div>

                                <div className="input-icon">
                                    <Clock size={16} />
                                    <input
                                        type="time"
                                        name="start_time"
                                        onChange={handleChange}
                                        value={form.start_time}
                                        required
                                    />
                                </div>

                                <div className="input-icon">
                                    <Clock size={16} />
                                    <input
                                        type="time"
                                        name="end_time"
                                        onChange={handleChange}
                                        value={form.end_time}
                                        required
                                    />
                                </div>

                                <div className="textarea-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        placeholder="Enter your work summary"
                                        rows="4"
                                        onChange={handleChange}
                                        value={form.description}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </fieldset>

                        <div className="form-actions">
                            <button type="button" className="btn cancel" onClick={handleCancel}>
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

export default CreateDailyUpdateForm;
