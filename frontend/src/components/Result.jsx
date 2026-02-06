import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from '../config/firebase';
import './Result.css';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const resultData = location.state;

    useEffect(() => {
        if (!resultData) {
            navigate('/login');
        }
    }, [resultData, navigate]);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/login');
    };

    if (!resultData) {
        return null;
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} minutes ${secs} seconds`;
    };

    const { totalScore, sectionScores, timeTaken } = resultData;
    const percentage = ((totalScore / 40) * 100).toFixed(2);

    return (
        <div className="result-container">
            <div className="result-card">
                <div className="result-header">
                    <h1>🎉 Exam Completed!</h1>
                    <p>Your results are displayed below</p>
                </div>

                <div className="result-content">
                    <div className="total-score-section">
                        <div className="score-circle">
                            <div className="score-value">{totalScore}</div>
                            <div className="score-total">out of 40</div>
                        </div>
                        <div className="percentage">{percentage}%</div>
                    </div>

                    <div className="section-scores">
                        <h2>Section-wise Performance</h2>
                        <div className="section-grid">
                            <div className="section-card">
                                <div className="section-icon">📊</div>
                                <h3>Aptitude</h3>
                                <div className="section-score">{sectionScores.aptitude} / 10</div>
                                <div className="section-bar">
                                    <div
                                        className="section-bar-fill"
                                        style={{ width: `${(sectionScores.aptitude / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="section-card">
                                <div className="section-icon">💻</div>
                                <h3>Programming</h3>
                                <div className="section-score">{sectionScores.programming} / 10</div>
                                <div className="section-bar">
                                    <div
                                        className="section-bar-fill"
                                        style={{ width: `${(sectionScores.programming / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="section-card">
                                <div className="section-icon">🧩</div>
                                <h3>Problem Solving</h3>
                                <div className="section-score">{sectionScores.problemSolving} / 10</div>
                                <div className="section-bar">
                                    <div
                                        className="section-bar-fill"
                                        style={{ width: `${(sectionScores.problemSolving / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="section-card">
                                <div className="section-icon">🧠</div>
                                <h3>Logical Reasoning</h3>
                                <div className="section-score">{sectionScores.logicalReasoning} / 10</div>
                                <div className="section-bar">
                                    <div
                                        className="section-bar-fill"
                                        style={{ width: `${(sectionScores.logicalReasoning / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="time-taken">
                        <span className="time-icon">⏱️</span>
                        <span className="time-label">Time Taken:</span>
                        <span className="time-value">{formatTime(timeTaken)}</span>
                    </div>

                    <div className="result-footer">
                        <div className="info-box">
                            <p>✅ Your exam has been submitted successfully</p>
                            <p>⚠️ You cannot reattempt this examination</p>
                        </div>
                        <button onClick={handleLogout} className="logout-btn-result">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
