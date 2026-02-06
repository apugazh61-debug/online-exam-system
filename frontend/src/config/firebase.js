// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your Firebase project configuration
// Get this from Firebase Console > Project Settings > General > Your apps
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAW3p0rB7SAS3QNBOZ2BKvaE-t-acuvtRI",
    authDomain: "online-exam-system-fe048.firebaseapp.com",
    projectId: "online-exam-system-fe048",
    storageBucket: "online-exam-system-fe048.firebasestorage.app",
    messagingSenderId: "383996422017",
    appId: "1:383996422017:web:6667ee0c5274f322376a80",
    measurementId: "G-RZC8B422WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
