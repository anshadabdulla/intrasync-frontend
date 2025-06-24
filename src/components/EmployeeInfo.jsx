import React from 'react';
import { Mail, Phone, Droplet, CalendarDays, MapPin, Building, Briefcase, UserCog } from 'lucide-react';
import '../assets/styles/homePage.css';

const EmployeeInfo = ({ employee }) => {
    const photoDocument = employee?.documents?.find((doc) => doc.type === 'photo' && doc.file?.trim());

    return (
        <div className="employee-card">
            <div className="employee-header">
                <div className="profile-pic-wrapper">
                    {photoDocument ? (
                        <img src={photoDocument.file} alt="Profile" className="profile-pic-img" />
                    ) : (
                        <div className="profile-pic-default">👤</div>
                    )}
                </div>
                <div className="employee-basic">
                    <div className="employee-name">{employee?.name || '—'}</div>
                    <div className="employee-id">Employee ID: {employee?.employee_no || '—'}</div>
                </div>
            </div>

            <div className="info-grid">
                <div className="info-item">
                    <Mail className="icon text-purple-500" />
                    <div>
                        <div className="label">Email</div>
                        <div className="value" title={employee?.email}>
                            {employee?.email || '—'}
                        </div>
                    </div>
                </div>
                <div className="info-item">
                    <Phone className="icon text-sky-600" />
                    <div>
                        <div className="label">Mobile</div>
                        <div className="value">{employee?.mobile || '—'}</div>
                    </div>
                </div>
                <div className="info-item">
                    <Droplet className="icon text-rose-500" />
                    <div>
                        <div className="label">Blood Group</div>
                        <div className="value">{employee?.blood_group || '—'}</div>
                    </div>
                </div>
                <div className="info-item">
                    <CalendarDays className="icon text-yellow-500" />
                    <div>
                        <div className="label">Joining Date</div>
                        <div className="value">{employee?.doj || '—'}</div>
                    </div>
                </div>
                <div className="info-item">
                    <Building className="icon text-yellow-500" />
                    <div>
                        <div className="label">Department</div>
                        <div className="value">{employee?.Department?.name || '—'}</div>
                    </div>
                </div>
                <div className="info-item">
                    <Briefcase className="icon text-yellow-500" />
                    <div>
                        <div className="label">Designation</div>
                        <div className="value">{employee?.Designation?.name || '—'}</div>
                    </div>
                </div>
                <div className="info-item">
                    <UserCog className="icon text-yellow-500" />
                    <div>
                        <div className="label">Team Lead</div>
                        <div className="value">{employee?.TeamLead?.name || '—'}</div>
                    </div>
                </div>
                <div className="info-item">
                    <MapPin className="icon text-blue-500" />
                    <div>
                        <div className="label">Address</div>
                        <div className="value" style={{ whiteSpace: 'pre-line' }}>
                            {employee?.permenent_address || '—'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="button-group">
                <button className="btn">Service Book</button>
                <button className="btn">My Team</button>
            </div>
        </div>
    );
};

export default EmployeeInfo;
