// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBfKDGIUhQgEpnP_6MiCYHbEEZxTNSg5MA',
    authDomain: 'ottle-47f85.firebaseapp.com',
    projectId: 'ottle-47f85',
    storageBucket: 'ottle-47f85.appspot.com',
    messagingSenderId: '910588504710',
    appId: '1:910588504710:web:2251cc6d62e550d8007f07',
    measurementId: 'G-C6WE1L3ZXL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
