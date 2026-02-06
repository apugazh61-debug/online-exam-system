import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import axios from 'axios';
import Timer from './Timer';
import QuestionCard from './QuestionCard';
import './ExamPage.css';

const API_URL = 'http://localhost:5000/api';

const ExamPage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const startTimeRef = useRef(Date.now());
    const hasSubmittedRef = useRef(false);

    // Fetch questions on component mount
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    navigate('/login');
                    return;
                }

                const idToken = await user.getIdToken();
                const response = await axios.get(`${API_URL}/exam/questions`, {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                });

                setQuestions(response.data.questions);
                setAnswers(new Array(response.data.questions.length).fill(null));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                if (error.response?.status === 403) {
                    alert('You have already attempted this exam');
                    navigate('/login');
                } else {
                    alert('Failed to load questions. Please try again.');
                    navigate('/instructions');
                }
            }
        };

        fetchQuestions();
    }, [navigate]);

    // Disable browser back button
    useEffect(() => {
        window.history.pushState(null, '', window.location.href);

        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
            if (window.confirm('Going back will submit your exam. Are you sure?')) {
                handleSubmit();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Detect page exit/refresh and auto-submit
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
            handleSubmit();
        };

        const handleVisibilityChange = () => {
            if (document.hidden && !hasSubmittedRef.current) {
                handleSubmit();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [answers]);

    const handleSubmit = async () => {
        if (hasSubmittedRef.current) return;
        hasSubmittedRef.current = true;

        setSubmitting(true);

        try {
            const user = auth.currentUser;
            if (!user) {
                navigate('/login');
                return;
            }

            const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
            const idToken = await user.getIdToken();

            const response = await axios.post(
                `${API_URL}/exam/submit`,
                {
                    answers,
                    timeTaken
                },
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                }
            );

            // Navigate to result page with data
            navigate('/result', {
                state: {
                    totalScore: response.data.totalScore,
                    sectionScores: response.data.sectionScores,
                    timeTaken: response.data.timeTaken
                }
            });
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit exam. Please try again.');
            hasSubmittedRef.current = false;
            setSubmitting(false);
        }
    };

    const handleAnswerSelect = (answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleTimeUp = () => {
        alert('Time is up! Your exam will be submitted automatically.');
        handleSubmit();
    };

    if (loading) {
        return (
            <div className="exam-loading">
                <div className="loader"></div>
                <p>Loading questions...</p>
            </div>
        );
    }

    if (submitting) {
        return (
            <div className="exam-loading">
                <div className="loader"></div>
                <p>Submitting your exam...</p>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const answeredCount = answers.filter(a => a !== null).length;

    return (
        <div className="exam-container">
            <div className="exam-header">
                <div className="exam-title">
                    <h1>📝 Online Examination</h1>
                    <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                </div>
                <Timer onTimeUp={handleTimeUp} />
            </div>

            <div className="exam-content">
                <div className="exam-sidebar">
                    <h3>Question Navigator</h3>
                    <div className="question-grid">
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                className={`question-nav-btn ${index === currentQuestionIndex ? 'active' : ''
                                    } ${answers[index] !== null ? 'answered' : ''}`}
                                onClick={() => setCurrentQuestionIndex(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div className="exam-stats">
                        <p><strong>Answered:</strong> {answeredCount} / {questions.length}</p>
                        <p><strong>Unanswered:</strong> {questions.length - answeredCount}</p>
                    </div>
                </div>

                <div className="exam-main">
                    <QuestionCard
                        question={currentQuestion}
                        selectedAnswer={answers[currentQuestionIndex]}
                        onAnswerSelect={handleAnswerSelect}
                    />

                    <div className="exam-navigation">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className="nav-btn prev-btn"
                        >
                            ← Previous
                        </button>

                        {currentQuestionIndex === questions.length - 1 ? (
                            <button onClick={handleSubmit} className="nav-btn submit-btn">
                                Submit Exam
                            </button>
                        ) : (
                            <button onClick={handleNext} className="nav-btn next-btn">
                                Next →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamPage;
