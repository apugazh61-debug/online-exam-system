import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import './Result.css';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const resultData = location.state;
    const [showDetails, setShowDetails] = useState(false);
    const [filterSection, setFilterSection] = useState('all');

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

    const { totalScore, correctCount, wrongCount, sectionScores, timeTaken, answerDetails } = resultData;
    const percentage = ((totalScore / 40) * 100).toFixed(2);
    const unansweredCount = answerDetails ? answerDetails.filter(a => !a.isAnswered).length : 0;

    // Filter answer details by section
    const filteredAnswers = answerDetails ?
        filterSection === 'all'
            ? answerDetails
            : answerDetails.filter(a => a.section.toLowerCase().replace(/\s+/g, '') === filterSection.toLowerCase())
        : [];

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

                    {/* Correct/Wrong/Unanswered Summary */}
                    <div className="answer-summary">
                        <div className="summary-card correct">
                            <div className="summary-icon">✅</div>
                            <div className="summary-content">
                                <div className="summary-label">Correct</div>
                                <div className="summary-value">{correctCount || 0}</div>
                            </div>
                        </div>
                        <div className="summary-card wrong">
                            <div className="summary-icon">❌</div>
                            <div className="summary-content">
                                <div className="summary-label">Wrong</div>
                                <div className="summary-value">{wrongCount || 0}</div>
                            </div>
                        </div>
                        <div className="summary-card unanswered">
                            <div className="summary-icon">⚠️</div>
                            <div className="summary-content">
                                <div className="summary-label">Unanswered</div>
                                <div className="summary-value">{unansweredCount}</div>
                            </div>
                        </div>
                    </div>

                    <div className="section-scores">
                        <h2>Section-wise Performance</h2>
                        <div className="section-grid">
                            <div className="section-card">
                                <div className="section-icon">📊</div>
                                <h3>Aptitude</h3>
                                <div className="section-score">{sectionScores["Aptitude"]?.correct || 0} / 10</div>
                                <div className="section-bar">
                                    <div
                                        className="section-bar-fill"
                                        style={{ width: `${((sectionScores["Aptitude"]?.correct || 0) / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="section-card">
                                <div className="section-icon">💻</div>
                                <h3>Programming</h3>
                                <div className="section-score">{sectionScores["Programming"]?.correct || 0} / 10</div>
                                <div className="section-bar">
                                    <div
                                        className="section-bar-fill"
                                        style={{ width: `${((sectionScores["Programming"]?.correct || 0) / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="section-card">
                                <div className="section-icon">🧩</div>
                                <h3>Problem Solving</h3>
                                <div className="section-score">{sectionScores["Problem Solving"]?.correct || 0} / 10</div>
                                <div className="section-bar">
                                    <div
                                        className="section-bar-fill"
                                        style={{ width: `${((sectionScores["Problem Solving"]?.correct || 0) / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="section-card">
                                <div className="section-icon">🧠</div>
                                <h3>Logical Reasoning</h3>
                                <div className="section-score">{sectionScores["Logical Reasoning"]?.correct || 0} / 10</div>
                                <div className="section-bar">
                                    <div
                                        className="section-bar-fill"
                                        style={{ width: `${((sectionScores["Logical Reasoning"]?.correct || 0) / 10) * 100}%` }}
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

                    {/* Detailed Answer Analysis */}
                    {answerDetails && answerDetails.length > 0 && (
                        <div className="answer-details-section">
                            <div className="details-header">
                                <h2>Detailed Answer Analysis</h2>
                                <button
                                    className="toggle-details-btn"
                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    {showDetails ? '▲ Hide Details' : '▼ Show Details'}
                                </button>
                            </div>

                            {showDetails && (
                                <>
                                    <div className="section-filter">
                                        <button
                                            className={filterSection === 'all' ? 'active' : ''}
                                            onClick={() => setFilterSection('all')}
                                        >
                                            All Sections
                                        </button>
                                        <button
                                            className={filterSection === 'aptitude' ? 'active' : ''}
                                            onClick={() => setFilterSection('aptitude')}
                                        >
                                            Aptitude
                                        </button>
                                        <button
                                            className={filterSection === 'programming' ? 'active' : ''}
                                            onClick={() => setFilterSection('programming')}
                                        >
                                            Programming
                                        </button>
                                        <button
                                            className={filterSection === 'problemsolving' ? 'active' : ''}
                                            onClick={() => setFilterSection('problemsolving')}
                                        >
                                            Problem Solving
                                        </button>
                                        <button
                                            className={filterSection === 'logicalreasoning' ? 'active' : ''}
                                            onClick={() => setFilterSection('logicalreasoning')}
                                        >
                                            Logical Reasoning
                                        </button>
                                    </div>

                                    <div className="answer-list">
                                        {filteredAnswers.map((answer, index) => (
                                            <div
                                                key={answer.questionId}
                                                className={`answer-item ${answer.isCorrect ? 'correct' : answer.isAnswered ? 'wrong' : 'unanswered'}`}
                                            >
                                                <div className="answer-item-header">
                                                    <span className="question-number">Q{answer.questionId}</span>
                                                    <span className="question-section">{answer.section}</span>
                                                    <span className={`answer-status ${answer.isCorrect ? 'correct' : answer.isAnswered ? 'wrong' : 'unanswered'}`}>
                                                        {answer.isCorrect ? '✅ Correct' : answer.isAnswered ? '❌ Wrong' : '⚠️ Unanswered'}
                                                    </span>
                                                </div>
                                                <div className="question-text">{answer.question}</div>
                                                <div className="options-list">
                                                    {answer.options.map((option, optIndex) => (
                                                        <div
                                                            key={optIndex}
                                                            className={`option-item ${optIndex === answer.correctAnswer ? 'correct-answer' : ''
                                                                } ${optIndex === answer.userAnswer && !answer.isCorrect ? 'wrong-answer' : ''
                                                                } ${optIndex === answer.userAnswer && answer.isCorrect ? 'user-correct' : ''
                                                                }`}
                                                        >
                                                            <span className="option-label">{String.fromCharCode(65 + optIndex)}.</span>
                                                            <span className="option-text">{option}</span>
                                                            {optIndex === answer.correctAnswer && (
                                                                <span className="correct-badge">✓ Correct Answer</span>
                                                            )}
                                                            {optIndex === answer.userAnswer && !answer.isCorrect && (
                                                                <span className="wrong-badge">✗ Your Answer</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                {!answer.isAnswered && (
                                                    <div className="not-answered-msg">
                                                        You did not answer this question
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

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

