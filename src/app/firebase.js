// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
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

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'asia-northeast3');
export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
        '6LcWP1ghAAAAAHA2fXatyxo0VW-Km4AtWkUtLlfg'
    ),
    isTokenAutoRefreshEnabled: true,
});
if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(firestore, 'localhost', `8080`);
    connectStorageEmulator(storage, 'localhost', `9199`);
    connectFunctionsEmulator(functions, 'localhost', '5001');
}
