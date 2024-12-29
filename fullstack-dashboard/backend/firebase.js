import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// Your Firebase configuration (replace with your actual Firebase project config)
const firebaseConfig = {
    apiKey: "AIzaSyAXti3bCSIkcHGqLPcfsJg58cDPzadAnO8",
    authDomain: "orgproject-2ebef.firebaseapp.com",
    projectId: "orgproject-2ebef",
    storageBucket: "orgproject-2ebef.firebasestorage.app",
    messagingSenderId: "467015725863",
    appId: "1:467015725863:web:d9afbe8974c84f320bef02",
    measurementId: "G-Q5541HBJW6"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Firestore database
const db = app.firestore();

// Firebase storage for file uploads
const storage = app.storage();

export { db, storage };
