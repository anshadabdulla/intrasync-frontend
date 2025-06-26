import React from 'react';
import { Users, Ticket, HardDrive, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CardsSummary = () => {
    const navigate = useNavigate();

    let userType = '';
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            userType = decoded.user_type?.toLowerCase();
        }
    } catch (err) {
        console.error('Token decode failed:', err);
    }

    return (
        <div className="cards-summary">
            <div className="card" onClick={() => navigate('/employe-list')} style={{ cursor: 'pointer' }}>
                <div className="icon-circle bg-purple-100">
                    <Users className="text-purple-700" size={24} />
                </div>
                <div>
                    <div className="text-lg font-bold text-black flex items-center gap-1">
                        <span className="num-total">61</span>
                    </div>
                    <div className="text-gray-700">Employees</div>
                </div>
            </div>

            <div
                className="card"
                onClick={() => {
                    if (userType === 'hr') {
                        navigate('/ticket-list');
                    } else {
                        alert('Access denied: Only HR can view tickets.');
                    }
                }}
                style={{ cursor: 'pointer' }}
            >
                <div className="icon-circle bg-blue-100">
                    <Ticket className="text-blue-700" size={24} />
                </div>
                <div>
                    <div className="text-lg font-bold text-black">11</div>
                    <div className="text-gray-700">Tickets</div>
                </div>
            </div>

            <div className="card" onClick={() => navigate('/asset-list')} style={{ cursor: 'pointer' }}>
                <div className="icon-circle bg-red-100">
                    <HardDrive className="text-red-700" size={24} />
                </div>
                <div>
                    <div className="text-lg font-bold text-black">38</div>
                    <div className="text-gray-700">Assets</div>
                </div>
            </div>

            <div className="card" onClick={() => navigate('/exam-results')} style={{ cursor: 'pointer' }}>
                <div className="icon-circle bg-green-100">
                    <UserCheck className="text-green-700" size={24} />
                </div>
                <div>
                    <div className="text-lg font-bold text-black">1</div>
                    <div className="text-gray-700">Exam Results</div>
                </div>
            </div>
        </div>
    );
};

export default CardsSummary;
