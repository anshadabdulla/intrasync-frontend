import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/styles/createTicketForm.css';
import { getDailyUpdateById, updateDailyUpdate } from '../api/dailyUpdateService';
import { CalendarDays, Clock } from 'lucide-react';

const UpdateDailyUpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: '' });
    const [error, setError] = useState('');

    const showToast = (msg) => {
        setToast({ visible: true, message: msg });
        setTimeout(() => setToast({ visible: false, message: '' }), 4000);
    };

    useEffect(() => {
        const fetchUpdate = async () => {
            try {
                const res = await getDailyUpdateById(id);
                if (res.data.status) {
                    setForm(res.data.data);
                } else {
                    setError('Failed to fetch daily update data.');
                }
            } catch (err) {
                setError('Server error while fetching daily update.');
            }
        };

        fetchUpdate();
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
            const res = await updateDailyUpdate(id, form);
            if (res.data.status) {
                showToast('Daily update updated successfully!');
                setTimeout(() => navigate('/daily-updates-list'), 1000);
            } else {
                showToast(res.data.errors?.[0] || res.data.msg || 'Update failed.');
            }
        } catch (err) {
            showToast(err?.response?.data?.errors?.[0] || err?.response?.data?.msg || 'Server error.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/daily-updates-list');
    };

    if (!form) return <div className="loading-message">Loading update...</div>;

    return (
        <div className="page-wrapper">
            <div className="form-section">
                <h2 className="section-title">Update Daily Update</h2>
                <div className="form-body">
                    <form className="grid-form" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Update Information</legend>
                            <div className="grid-container">
                                <input
                                    name="title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                    value={form.title || ''}
                                    required
                                />

                                <div className="input-icon">
                                    <CalendarDays size={16} />
                                    <input
                                        type="date"
                                        name="date"
                                        onChange={handleChange}
                                        value={form.date || ''}
                                        required
                                    />
                                </div>

                                <div className="input-icon">
                                    <Clock size={16} />
                                    <input
                                        type="time"
                                        name="start_time"
                                        onChange={handleChange}
                                        value={form.start_time || ''}
                                        required
                                    />
                                </div>

                                <div className="input-icon">
                                    <Clock size={16} />
                                    <input
                                        type="time"
                                        name="end_time"
                                        onChange={handleChange}
                                        value={form.end_time || ''}
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
                                        value={form.description || ''}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </fieldset>

                        {error && <div className="form-error">{error}</div>}

                        <div className="form-actions">
                            <button type="button" className="btn cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button className="btn primary" type="submit" disabled={loading}>
                                {loading ? 'Updating...' : 'Update'}
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

export default UpdateDailyUpdateForm;
