import React from 'react';
import { Clock, Calendar, TrendingUp, CheckCircle } from 'lucide-react';

const AttendanceSection = () => {
    return (
        <div className="attendance-section">
            {/* Monthly Attendance Card */}
            <div className="attendance-card">
                <div className="card-header">
                    <div className="header-info">
                        <Calendar size={20} className="header-icon" />
                        <div>
                            <h4>Attendance</h4>
                            <p>June 2025</p>
                        </div>
                    </div>
                    <div className="attendance-percentage">
                        <span className="percentage">91%</span>
                    </div>
                </div>

                <div className="attendance-stats">
                    <div className="stat-row">
                        <span className="stat-label">Present Days</span>
                        <span className="stat-value">20/22</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Total Hours</span>
                        <span className="stat-value">168h 30m</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Avg. Hours/Day</span>
                        <span className="stat-value">8h 25m</span>
                    </div>
                </div>

                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '91%' }}></div>
                    </div>
                    <span className="progress-text">Excellent Performance</span>
                </div>
            </div>

            {/* Today's Attendance Card */}
            <div className="attendance-card">
                <div className="card-header">
                    <div className="header-info">
                        <Clock size={20} className="header-icon" />
                        <div>
                            <h4>Today's Attendance</h4>
                            <p>Friday, June 27</p>
                        </div>
                    </div>
                    <div className="status-indicator active">
                        <div className="status-dot"></div>
                        <span>Active</span>
                    </div>
                </div>

                <div className="today-time">
                    <div className="time-display">
                        <div className="time-block">
                            <span className="time-label">Check In</span>
                            <span className="time-value">09:15 AM</span>
                        </div>
                        <div className="time-separator">—</div>
                        <div className="time-block">
                            <span className="time-label">Current</span>
                            <span className="time-value live">7h 32m</span>
                        </div>
                    </div>
                </div>

                <div className="today-summary">
                    <div className="summary-item">
                        <span className="summary-label">Expected Out</span>
                        <span className="summary-value">06:15 PM</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Break Time</span>
                        <span className="summary-value">45 mins</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats Card */}
            <div className="attendance-card">
                <div className="card-header">
                    <div className="header-info">
                        <TrendingUp size={20} className="header-icon" />
                        <div>
                            <h4>This Week</h4>
                            <p>June 23 - 27</p>
                        </div>
                    </div>
                    <div className="week-score">
                        <CheckCircle size={18} className="check-icon" />
                        <span>5/5</span>
                    </div>
                </div>

                <div className="week-overview">
                    <div className="week-days">
                        <div className="day-item completed">
                            <span className="day-name">Mon</span>
                            <span className="day-hours">8h 30m</span>
                        </div>
                        <div className="day-item completed">
                            <span className="day-name">Tue</span>
                            <span className="day-hours">8h 45m</span>
                        </div>
                        <div className="day-item completed">
                            <span className="day-name">Wed</span>
                            <span className="day-hours">8h 15m</span>
                        </div>
                        <div className="day-item completed">
                            <span className="day-name">Thu</span>
                            <span className="day-hours">9h 10m</span>
                        </div>
                        <div className="day-item active">
                            <span className="day-name">Fri</span>
                            <span className="day-hours">7h 32m</span>
                        </div>
                    </div>
                </div>

                <div className="week-total">
                    <span className="total-label">Week Total</span>
                    <span className="total-hours">42h 12m</span>
                </div>
            </div>

            <style jsx>{`
                .attendance-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 20px;
                    margin-top: 24px;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .attendance-card {
                    background: #ffffff;
                    border-radius: 10px;
                    padding: 24px;
                    border: 1px solid #d1d5db;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
                    transition: all 0.2s ease;
                }

                .attendance-card:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
                    transform: translateY(-1px);
                }

                /* Card Header */
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 20px;
                }

                .header-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .header-icon {
                    color: #2563eb;
                    background: rgba(37, 99, 235, 0.1);
                    padding: 8px;
                    border-radius: 8px;
                    width: 36px;
                    height: 36px;
                }

                .card-header h4 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #111827;
                }

                .card-header p {
                    margin: 2px 0 0 0;
                    font-size: 13px;
                    color: #6b7280;
                }

                /* Attendance Percentage */
                .attendance-percentage {
                    text-align: right;
                }

                .percentage {
                    font-size: 32px;
                    font-weight: 800;
                    color: #059669;
                    line-height: 1;
                }

                /* Stats */
                .attendance-stats {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                }

                .stat-label {
                    font-size: 14px;
                    color: #6b7280;
                }

                .stat-value {
                    font-size: 14px;
                    font-weight: 600;
                    color: #111827;
                }

                /* Progress Bar */
                .progress-container {
                    margin-top: 16px;
                }

                .progress-bar {
                    width: 100%;
                    height: 6px;
                    background: #f1f5f9;
                    border-radius: 3px;
                    overflow: hidden;
                    margin-bottom: 8px;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #2563eb, #3b82f6);
                    border-radius: 3px;
                    transition: width 0.6s ease;
                }

                .progress-text {
                    font-size: 12px;
                    color: #2563eb;
                    font-weight: 500;
                }

                /* Status Indicator */
                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    font-weight: 500;
                }

                .status-indicator.active {
                    color: #059669;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #059669;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }

                /* Today's Time Display */
                .today-time {
                    margin-bottom: 20px;
                }

                .time-display {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 20px;
                    background: linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%);
                    border-radius: 10px;
                    border: 1px solid #d1d5db;
                }

                .time-block {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                }

                .time-label {
                    font-size: 11px;
                    color: #6b7280;
                    text-transform: uppercase;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    margin-bottom: 4px;
                }

                .time-value {
                    font-size: 18px;
                    font-weight: 700;
                    color: #111827;
                }

                .time-value.live {
                    color: #2563eb;
                }

                .time-separator {
                    font-size: 16px;
                    color: #d1d5db;
                    margin: 0 16px;
                }

                /* Today Summary */
                .today-summary {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .summary-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                }

                .summary-label {
                    font-size: 13px;
                    color: #6b7280;
                }

                .summary-value {
                    font-size: 13px;
                    font-weight: 600;
                    color: #111827;
                }

                /* Week Score */
                .week-score {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #059669;
                }

                .check-icon {
                    color: #059669;
                }

                /* Week Overview */
                .week-overview {
                    margin-bottom: 16px;
                }

                .week-days {
                    display: flex;
                    justify-content: space-between;
                    gap: 8px;
                }

                .day-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 12px 8px;
                    border-radius: 8px;
                    border: 1px solid #d1d5db;
                    background: #f9fafb;
                    flex: 1;
                    min-width: 0;
                    transition: all 0.2s ease;
                }

                .day-item.completed {
                    background: linear-gradient(135deg, rgba(5, 150, 105, 0.05) 0%, rgba(5, 150, 105, 0.08) 100%);
                    border-color: rgba(5, 150, 105, 0.2);
                }

                .day-item.active {
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(59, 130, 246, 0.08) 100%);
                    border-color: rgba(37, 99, 235, 0.2);
                }

                .day-name {
                    font-size: 11px;
                    color: #6b7280;
                    text-transform: uppercase;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                    margin-bottom: 4px;
                }

                .day-hours {
                    font-size: 12px;
                    font-weight: 600;
                    color: #111827;
                }

                .day-item.active .day-hours {
                    color: #2563eb;
                }

                /* Week Total */
                .week-total {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 16px;
                    background: linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%);
                    border-radius: 8px;
                    border: 1px solid #d1d5db;
                }

                .total-label {
                    font-size: 13px;
                    color: #6b7280;
                    font-weight: 500;
                }

                .total-hours {
                    font-size: 16px;
                    font-weight: 700;
                    color: #111827;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .attendance-section {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }

                    .time-display {
                        flex-direction: column;
                        gap: 12px;
                    }

                    .time-separator {
                        transform: rotate(90deg);
                        margin: 8px 0;
                    }

                    .week-days {
                        flex-wrap: wrap;
                    }

                    .day-item {
                        min-width: calc(20% - 6px);
                    }
                }
            `}</style>
        </div>
    );
};

export default AttendanceSection;