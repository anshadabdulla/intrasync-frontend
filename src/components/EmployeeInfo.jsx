import React from 'react';

const EmployeeInfo = ({ employee }) => (
    <div className="employee-info">
        <div className="profile-pic">👤</div>
        <div className="info-columns">
            <div className="info-left">
                <div className="info-item">
                    <strong>Designation:</strong> {employee?.designation}
                </div>
                <div className="info-item">
                    <strong>Department:</strong> {employee?.department}
                </div>
                <div className="info-item">
                    <strong>Reporting Manager:</strong> {employee?.reporting_manager}
                </div>
                <div className="info-item">
                    <strong>Score:</strong> 0
                </div>
            </div>
            <div className="info-right">
                <div className="info-item">
                    <strong>Email:</strong> {employee?.email}
                </div>
                <div className="info-item">
                    <strong>Mobile Number:</strong> {employee?.mobile}
                </div>
                <div className="info-item">
                    <strong>Blood Group:</strong> {employee?.blood_group}
                </div>
                <div className="info-item">
                    <strong>Date Of Joining:</strong> {employee?.joining_date}
                </div>
                <div className="info-item">
                    <strong>Address:</strong> {employee?.address}
                </div>
                <div className="info-item">
                    <strong>Gender:</strong> {employee?.gender}
                </div>
                <div className="button-group">
                    <button className="btn">Service Book</button>
                    <button className="btn">My Team</button>
                </div>
            </div>
        </div>
    </div>
);

export default EmployeeInfo;
