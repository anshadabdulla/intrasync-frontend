import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getAllDailyUpdates, deleteDailyUpdateById, downloadDailyUpdateExcel } from '../api/dailyUpdateService';
import excel from '../assets/images/excel-download.png';
import '../assets/styles/TicketListForm.css';

const ListDailyUpdateForm = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ message: '', visible: false });
    const [search, setSearch] = useState('');
    const [selectedUpdates, setSelectedUpdates] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [userId, setUserId] = useState(null);
    const selectAllRef = useRef(null);
    const navigate = useNavigate();

    const showToast = (message) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast({ message: '', visible: false }), 4000);
    };

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setUserId(decoded.userId);
            }
        } catch (err) {
            console.error('Invalid token:', err);
        }
    }, []);

    const fetchUpdates = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllDailyUpdates({ search, created_by: userId });
            if (res.data.status) {
                setUpdates(res.data.data);
                setSelectedUpdates([]);
            } else {
                showToast(res.data.msg || 'Failed to fetch updates');
            }
        } catch (err) {
            const backendMsg = err?.response?.data?.msg || err?.response?.data?.errors?.[0] || 'Server error';
            showToast(backendMsg);
        } finally {
            setLoading(false);
        }
    }, [search, userId]);

    useEffect(() => {
        if (userId) fetchUpdates();
    }, [fetchUpdates, userId]);

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = selectedUpdates.length > 0 && selectedUpdates.length < updates.length;
        }
    }, [selectedUpdates, updates]);

    const handleSelectAll = (e) => {
        setSelectedUpdates(e.target.checked ? updates.map((u) => u.id) : []);
    };

    const handleSelectOne = (id, checked) => {
        setSelectedUpdates((prev) => (checked ? [...prev, id] : prev.filter((uid) => uid !== id)));
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await deleteDailyUpdateById(deletingId);
            if (res.data.status) {
                showToast('Deleted successfully');
                setShowDeleteModal(false);
                fetchUpdates();
            } else {
                showToast(res.data.msg || 'Delete failed');
            }
        } catch (err) {
            showToast('Server error');
        } finally {
            setDeleting(false);
        }
    };

    const handleExcelDownload = async () => {
        setLoading(true);
        try {
            const response = await downloadDailyUpdateExcel({ search, created_by: userId });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'daily_update_data.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            showToast('Failed to download Excel');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="employee-container">
            <div className="header">
                <h2>Daily Updates</h2>
                <button className="add-btn" onClick={() => navigate('/daily-updates')}>
                    + Add Update
                </button>
            </div>

            {toast.visible && (
                <div className="toast-popup center-toast">
                    <span>{toast.message}</span>
                </div>
            )}

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by Title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-btn" onClick={fetchUpdates}>
                    Search
                </button>
                <button
                    className="reset-btn"
                    onClick={() => {
                        setSearch('');
                        fetchUpdates();
                    }}
                >
                    Reset
                </button>
                <button className="excel-download-btn" title="Download Excel" onClick={handleExcelDownload}>
                    <img src={excel} alt="Download Excel" />
                </button>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="delete-modal-box">
                        <div className="delete-icon-circle">
                            <span className="delete-exclamation">!</span>
                        </div>
                        <h2 className="delete-modal-heading">Are you sure want to delete?</h2>
                        <div className="delete-modal-actions">
                            <button className="delete-cancel-btn" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button className="delete-confirm-btn" onClick={handleDelete} disabled={deleting}>
                                {deleting ? 'Deleting...' : 'Yes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loader-wrapper">
                    <div className="loader-dots">
                        <span></span>
                    </div>
                </div>
            ) : updates.length === 0 ? (
                <p>No updates found.</p>
            ) : (
                <div className="table-scroll-wrapper">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        ref={selectAllRef}
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={updates.length > 0 && selectedUpdates.length === updates.length}
                                    />
                                </th>
                                <th>SL.NO</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Description</th>
                                <th>Created By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {updates.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedUpdates.includes(item.id)}
                                            onChange={(e) => handleSelectOne(item.id, e.target.checked)}
                                        />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.date ? new Date(item.date).toLocaleDateString('en-IN') : '-'}</td>
                                    <td>{item.start_time}</td>
                                    <td>{item.end_time}</td>
                                    <td>{item.description}</td>
                                    <td>{item.CreatedEmployee?.name || '-'}</td>
                                    <td className="actions-cell">
                                        <button
                                            className="action-icon-btn"
                                            onClick={() => navigate(`/daily-updates/${item.id}`)}
                                            title="Edit"
                                        >
                                            <img src="/icons/edit-icon.svg" alt="Edit" />
                                        </button>
                                        <button
                                            className="action-icon-btn"
                                            onClick={() => {
                                                setDeletingId(item.id);
                                                setShowDeleteModal(true);
                                            }}
                                            title="Delete"
                                        >
                                            <img src="/icons/delete-icon.svg" alt="Delete" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListDailyUpdateForm;
