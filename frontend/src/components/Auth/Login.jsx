import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const API_URL = const API_URL = "https://online-exam-system-3kc8.onrender.com";;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

            // Get ID token
            const idToken = await userCredential.user.getIdToken();

            // Check if user has already attempted the exam
            const response = await axios.get(`${API_URL}/auth/check-attempt`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            if (response.data.hasAttempted) {
                setError('You have already attempted this test');
                await auth.signOut();
                setLoading(false);
                return;
            }

            // Navigate to instructions page
            navigate('/instructions');

        } catch (error) {
            console.error('Login error:', error);

            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
                setError('Invalid email or password');
            } else if (error.code === 'auth/wrong-password') {
                setError('Invalid email or password');
            } else if (error.response?.status === 404) {
                setError('User not found. Please register first.');
            } else {
                setError('Login failed. Please try again.');
            }
            setLoading(false);
        }
    };

    return (
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
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
