import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_apiKey,
    authDomain: process.env.REACT_APP_FB_authDomain,
    projectId: process.env.REACT_APP_FB_projectId,
    storageBucket: process.env.REACT_APP_FB_storageBucket,
    messagingSenderId: process.env.REACT_APP_FB_messagingSenderId,
    appId: process.env.REACT_APP_FB_appId,
    measurementId: process.env.REACT_APP_FB_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, process.env.REACT_APP_FB_region);
export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
        process.env.REACT_APP_FB_recaptchaProvider
    ),
    isTokenAutoRefreshEnabled: true,
});
if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(firestore, 'localhost', `8080`);
    connectStorageEmulator(storage, 'localhost', `9199`);
    connectFunctionsEmulator(functions, 'localhost', '5001');
}
