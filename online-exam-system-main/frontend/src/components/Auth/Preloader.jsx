import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            if (onComplete) {
                onComplete();
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!show) return null;

    return (
        <div className="preloader-overlay">
            <div className="preloader-content">
                <div className="logo-container">
                    <img src="/favicon.png" alt="GCT Logo" className="preloader-logo" />
                </div>
                <div className="text-container">
                    <h1 className="preloader-title-line1">GNANAMANI COLLEGE OF</h1>
                    <h2 className="preloader-title-line2">TECHNOLOGY</h2>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
