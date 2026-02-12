import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import Preloader from './Preloader';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // Check if user has already attempted the exam
            const resultDoc = await getDoc(doc(db, 'results', userCredential.user.uid));

            if (resultDoc.exists()) {
                // User has already submitted - show their results
                const resultData = resultDoc.data();
                navigate('/result', {
                    state: {
                        totalScore: resultData.totalScore,
                        correctCount: resultData.correctCount,
                        wrongCount: resultData.wrongCount,
                        sectionScores: resultData.sectionScores,
                        timeTaken: resultData.timeTaken,
                        answerDetails: resultData.answerDetails
                    }
                });
            } else {
                // User hasn't attempted yet - proceed to instructions
                navigate('/instructions');
            }

        } catch (error) {
            console.error('Login error:', error);

            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
                setError('Invalid email or password');
            } else if (error.code === 'auth/wrong-password') {
                setError('Invalid email or password');
            } else {
                setError('Login failed. Please try again.');
            }
            setLoading(false);
        }
    };

    return (
        <>
            {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
            <div className="auth-container">
            <div className="auth-card">
                <div className="college-logo">
                    <img src="/assets/gct-logo.png" alt="GCT Logo" />
                </div>
                <h1>Login to Exam Portal</h1>
                <p className="auth-subtitle">Enter your credentials to access the examination</p>

                {error && <div className="message error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>

                <div className="creator-credit-card">
                    <div className="credit-separator"></div>
                    <p className="credit-text-card">
                        Created by CSE Students: Pugazhenthi, Karthikeyan
                    </p>
                </div>
            </div>
            </div>
        </>
    );
};

export default Login;
