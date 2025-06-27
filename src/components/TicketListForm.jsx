import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './../assets/styles/TicketListForm.css';
import excel from '../assets/images/excel-download.png';
import { getAllTicket, getMyTickets, deleteTicketById, downloadTicketExcel } from '../api/ticketService';

const STATUS_MAP = {
    0: 'Pending',
    1: 'Resolved',
    2: 'Rejected',
    3: 'On Hold',
    4: 'Revoked'
};

const CATEGORY_OPTIONS = ['Bug', 'Feature Request', 'Support', 'Other'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', visible: false });
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
    const selectAllRef = useRef(null);
    const statusDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);
    const priorityDropdownRef = useRef(null);
    const navigate = useNavigate();

    const [userType, setUserType] = useState('');

    const showToast = (message) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast({ message: '', visible: false }), 4000);
    };

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setUserType(decoded.user_type?.toLowerCase());
            }
        } catch (err) {
            console.error('Invalid token:', err);
        }
    }, []);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            let res;
            if (userType === 'hr') {
                res = await getAllTicket({ search, status, category, priority });
            } else {
                res = await getMyTickets();
            }

            if (res.data.status) {
                setTickets(res.data.data);
                setSelectedTickets([]);
            } else {
                showToast(res.data.msg || 'Failed to fetch tickets');
            }
        } catch (err) {
            const backendMsg = err?.response?.data?.msg || err?.response?.data?.errors?.[0] || 'Server error';
            showToast(backendMsg);
        } finally {
            setLoading(false);
        }
    }, [search, status, category, priority, userType]);

    useEffect(() => {
        if (userType) {
            fetchTickets();
        }
    }, [fetchTickets, userType]);

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = selectedTickets.length > 0 && selectedTickets.length < tickets.length;
        }
    }, [selectedTickets, tickets]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setStatusDropdownOpen(false);
            }
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setCategoryDropdownOpen(false);
            }
            if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(event.target)) {
                setPriorityDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCreateTicket = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        navigate('/ticket-create');
    };

    const handleConfirmDelete = async () => {
        setDeleting(true);
        try {
            const res = await deleteTicketById(deletingId);
            if (res.data.status) {
                setShowDeleteModal(false);
                setDeletingId(null);
                fetchTickets();
            } else {
                showToast(res.data.msg || 'Failed to delete.');
            }
        } catch (err) {
            const backendMsg = err?.response?.data?.msg || err?.response?.data?.errors?.[0] || 'Server error';
            showToast(backendMsg);
        } finally {
            setDeleting(false);
        }
    };

    const handleSelectAll = (e) => {
        setSelectedTickets(e.target.checked ? tickets.map((t) => t.id) : []);
    };

    const handleSelectOne = (id, checked) => {
        setSelectedTickets((prev) => (checked ? [...prev, id] : prev.filter((tid) => tid !== id)));
    };

    const handleResetFilters = () => {
        setSearch('');
        setStatus('');
        setCategory('');
        setPriority('');
    };

    return (
        <div className="employee-container">
            <div className="header">
                <h2>Ticket List</h2>
                {
                    <button className="add-btn" onClick={handleCreateTicket}>
                        + Add Ticket
                    </button>
                }
            </div>

            {toast.visible && (
                <div className="toast-popup center-toast">
                    <span>{toast.message}</span>
                </div>
            )}

            {
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search by ID or Title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="dropdown" ref={statusDropdownRef}>
                        <button className="dropdown-toggle" onClick={() => setStatusDropdownOpen((prev) => !prev)}>
                            {STATUS_MAP[status] || 'All Status'}
                            <span className="dropdown-arrow">▾</span>
                        </button>
                        {statusDropdownOpen && (
                            <ul className="dropdown-menu show">
                                {Object.entries(STATUS_MAP).map(([val, label]) => (
                                    <li
                                        key={val}
                                        onClick={() => {
                                            setStatus(val);
                                            setStatusDropdownOpen(false);
                                        }}
                                    >
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="dropdown" ref={categoryDropdownRef}>
                        <button className="dropdown-toggle" onClick={() => setCategoryDropdownOpen((prev) => !prev)}>
                            {category || 'All Categories'}
                            <span className="dropdown-arrow">▾</span>
                        </button>
                        {categoryDropdownOpen && (
                            <ul className="dropdown-menu show">
                                {CATEGORY_OPTIONS.map((cat) => (
                                    <li
                                        key={cat}
                                        onClick={() => {
                                            setCategory(cat);
                                            setCategoryDropdownOpen(false);
                                        }}
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="dropdown" ref={priorityDropdownRef}>
                        <button className="dropdown-toggle" onClick={() => setPriorityDropdownOpen((prev) => !prev)}>
                            {priority || 'All Priorities'}
                            <span className="dropdown-arrow">▾</span>
                        </button>
                        {priorityDropdownOpen && (
                            <ul className="dropdown-menu show">
                                {PRIORITY_OPTIONS.map((pri) => (
                                    <li
                                        key={pri}
                                        onClick={() => {
                                            setPriority(pri);
                                            setPriorityDropdownOpen(false);
                                        }}
                                    >
                                        {pri}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button className="search-btn" onClick={fetchTickets}>
                        Search
                    </button>
                    <button className="reset-btn" onClick={handleResetFilters}>
                        Reset
                    </button>
                    <button
                        className="excel-download-btn"
                        title="Download Excel"
                        onClick={async () => {
                            try {
                                const response = await downloadTicketExcel({ search, status, category, priority });
                                const url = window.URL.createObjectURL(new Blob([response.data]));
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', 'ticket_data.xlsx');
                                document.body.appendChild(link);
                                link.click();
                                link.remove();
                            } catch (err) {
                                console.error('Excel download error:', err);
                                alert('Failed to download Excel file');
                            }
                        }}
                    >
                        <img src={excel} alt="Download Excel" />
                    </button>
                </div>
            }

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="delete-modal-box">
                        <div className="delete-icon-circle">
                            <span className="delete-exclamation">!</span>
                        </div>
                        <h2 className="delete-modal-heading">Are you sure want to delete?</h2>
                        {deleting ? (
                            <div className="delete-modal-loading">
                                <div className="spinner"></div>
                                <p className="delete-loading-text">Deleting...</p>
                            </div>
                        ) : (
                            <div className="delete-modal-actions">
                                <button className="delete-cancel-btn" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button className="delete-confirm-btn" onClick={handleConfirmDelete}>
                                    Yes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loader-wrapper">
                    <div className="loader-dots">
                        <span></span>
                    </div>
                </div>
            ) : tickets.length === 0 ? (
                <p>No tickets found.</p>
            ) : (
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    ref={selectAllRef}
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={tickets.length > 0 && selectedTickets.length === tickets.length}
                                />
                            </th>
                            <th>SL.NO</th>
                            <th>Ticket ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Created By</th>
                            {<th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={ticket.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedTickets.includes(ticket.id)}
                                        onChange={(e) => handleSelectOne(ticket.id, e.target.checked)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>{ticket.ticket_id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.category}</td>
                                <td>{ticket.priority}</td>
                                <td>{ticket.description}</td>
                                <td>{STATUS_MAP[ticket.status]}</td>
                                <td>{ticket.CreatedBy?.full_name || '-'}</td>
                                {
                                    <td className="actions-cell">
                                        <button
                                            className="action-icon-btn"
                                            onClick={async () => {
                                                setLoading(true);
                                                await new Promise((resolve) => setTimeout(resolve, 300));
                                                navigate(`/ticket-update/${ticket.id}`);
                                            }}
                                            title="Edit"
                                        >
                                            <img src="/icons/edit-icon.svg" alt="Edit" />
                                        </button>
                                        <button
                                            className="action-icon-btn"
                                            onClick={() => {
                                                setDeletingId(ticket.id);
                                                setShowDeleteModal(true);
                                            }}
                                            title="Delete"
                                        >
                                            <img src="/icons/delete-icon.svg" alt="Delete" />
                                        </button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TicketList;
