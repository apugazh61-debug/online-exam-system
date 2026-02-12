// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase project configuration
// Get this from Firebase Console > Project Settings > General > Your apps
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALNgcCXCJHYHIlLl6ePZwMGiY06DGJ0iU",
  authDomain: "online-exam-system-60470.firebaseapp.com",
  projectId: "online-exam-system-60470",
  storageBucket: "online-exam-system-60470.firebasestorage.app",
  messagingSenderId: "284228943087",
  appId: "1:284228943087:web:fd0a7a63611e21e4e36f1a",
  measurementId: "G-DPJJJPJ8K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
