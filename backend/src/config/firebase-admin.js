const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin SDK
// IMPORTANT: You need to download your Firebase service account key JSON file
// and place it in the backend directory, then update the path below
try {
    const serviceAccount = require('../../firebase-service-account.json');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    console.log('Firebase Admin initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase Admin:', error.message);
    console.log('Please add your firebase-service-account.json file to the backend directory');
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
