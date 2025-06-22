import React from 'react';
import { Users, Ticket, HardDrive, UserCheck } from 'lucide-react';

const CardsSummary = () => (
    <div className="cards-summary">
        <div className="card">
            <div className="icon-circle bg-purple-100">
                <Users className="text-purple-700" size={24} />
            </div>
            <div>
                <div className="text-lg font-bold text-black flex items-center gap-1">
                    <span className="num-total">61</span>
                    <span className="num-green">| 55</span>
                    <span className="num-blue-dark">| 6</span>
                    <span className="num-amber">| 14</span>
                    <span className="num-blue-light">| 16</span>
                </div>
                <div className="text-gray-700">Employees</div>
            </div>
        </div>
        <div className="card">
            <div className="icon-circle bg-blue-100">
                <Ticket className="text-blue-700" size={24} />
            </div>
            <div>
                <div className="text-lg font-bold text-black">11</div>
                <div className="text-gray-700">Tickets</div>
            </div>
        </div>
        <div className="card">
            <div className="icon-circle bg-red-100">
                <HardDrive className="text-red-700" size={24} />
            </div>
            <div>
                <div className="text-lg font-bold text-black">38</div>
                <div className="text-gray-700">Assets</div>
            </div>
        </div>
        <div className="card">
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

export default CardsSummary;
