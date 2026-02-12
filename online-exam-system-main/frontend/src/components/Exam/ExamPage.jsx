import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import Timer from './Timer';
import QuestionCard from './QuestionCard';
import questionsData from '../../data/questions';
import './ExamPage.css';

const ExamPage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const startTimeRef = useRef(Date.now());
    const hasSubmittedRef = useRef(false);

    // Load questions from local data
    useEffect(() => {
        const loadQuestions = () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    navigate('/login');
                    return;
                }

                setQuestions(questionsData);
                setAnswers(new Array(questionsData.length).fill(null));
                setLoading(false);
            } catch (error) {
                console.error('Error loading questions:', error);
                alert('Failed to load questions. Please try again.');
                navigate('/instructions');
            }
        };

        loadQuestions();
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

            // Calculate results locally
            let correctCount = 0;
            let wrongCount = 0;
            const sectionScores = {};
            const answerDetails = [];

            questions.forEach((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const isAnswered = userAnswer !== null;

                if (isCorrect) {
                    correctCount++;
                } else if (isAnswered) {
                    wrongCount++;
                }

                // Track section scores
                if (!sectionScores[question.section]) {
                    sectionScores[question.section] = { correct: 0, total: 0 };
                }
                sectionScores[question.section].total++;
                if (isCorrect) {
                    sectionScores[question.section].correct++;
                }

                // Store answer details
                answerDetails.push({
                    questionId: question.id,
                    section: question.section,
                    question: question.question,
                    options: question.options,
                    correctAnswer: question.correctAnswer,
                    userAnswer: userAnswer,
                    isCorrect: isCorrect
                });
            });

            const totalScore = correctCount;

            // Save results to Firestore
            await setDoc(doc(db, 'results', user.uid), {
                userId: user.uid,
                email: user.email,
                totalScore,
                correctCount,
                wrongCount,
                unansweredCount: questions.length - correctCount - wrongCount,
                sectionScores,
                timeTaken,
                answerDetails,
                submittedAt: serverTimestamp()
            });

            // Update user's hasAttempted status
            await updateDoc(doc(db, 'users', user.uid), {
                hasAttempted: true,
                lastAttemptAt: serverTimestamp()
            });

            // Navigate to result page with data
            navigate('/result', {
                state: {
                    totalScore,
                    correctCount,
                    wrongCount,
                    sectionScores,
                    timeTaken,
                    answerDetails
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
