import React from 'react';

const EmployeeInfo = ({ employee }) => (
    <div className="employee-info">
        <div className="profile-pic-wrapper">
            {employee?.photo && employee.photo.trim() !== '' ? (
                <img src={employee.photo} alt="Profile" className="profile-pic-img" />
            ) : (
                <div className="profile-pic-default">
                    <span style={{ fontSize: 48 }}>👤</span>
                </div>
            )}
        </div>
        <div className="info-columns">
            <div className="info-left">
                <div className="employee-main">
                    <div className="employee-main-name">{employee?.name}</div>
                    <div className="employee-main-id">
                        Employee ID: {employee?.employee_no || 'N/A'}
                    </div>
                </div>
                <div className="info-row">
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
            </div>
            <div className="info-right">
                <div className="info-row">
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
