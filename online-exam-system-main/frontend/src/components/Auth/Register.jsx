import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 10) errors.push('Minimum 10 characters required');
        if (!/[A-Z]/.test(password)) errors.push('At least 1 uppercase letter required');
        if (!/[0-9]/.test(password)) errors.push('At least 1 number required');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('At least 1 special symbol required');
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field
        setErrors(prev => ({ ...prev, [name]: '' }));

        // Real-time password validation
        if (name === 'password') {
            const passwordErrors = validatePassword(value);
            if (passwordErrors.length > 0) {
                setErrors(prev => ({ ...prev, password: passwordErrors.join(', ') }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const newErrors = {};

        // Validation
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            newErrors.password = passwordErrors.join(', ');
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // Save user data to Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                fullName: formData.fullName,
                email: formData.email,
                registeredAt: serverTimestamp(),
                hasAttempted: false
            });

            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error('Registration error:', error);

            if (error.code === 'auth/email-already-in-use') {
                setErrors({ email: 'This email already exists' });
            } else {
                setMessage('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="college-logo">
                    <img src="/assets/gct-logo.png" alt="GCT Logo" />
                </div>
                <h1>Register for Exam</h1>
                <p className="auth-subtitle">Create your account to take the online examination</p>

                {message && (
                    <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name *</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
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
                        {errors.password && <span className="error-text">{errors.password}</span>}
                        <small className="password-hint">
                            Min 10 characters, 1 uppercase, 1 number, 1 special symbol
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>

                <div className="creator-credit-card">
                    <div className="credit-separator"></div>
                    <p className="credit-text-card">
                        Created by CSE Students: Pugazhenthi, Karthikeyan
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
