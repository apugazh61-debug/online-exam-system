import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.2rem',
                color: '#4A90E2'
            }}>
                Loading...
            </div>
        );
    }

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
