import { async } from '@firebase/util';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { auth } from './firebase';
import { getUserByUID } from './firestore';

const googleProvider = new GoogleAuthProvider();
// Google API의 OAuth 2.0 범위 [https://developers.google.com/identity/protocols/oauth2/scopes?hl=ko]
googleProvider.addScope('profile');
googleProvider.addScope('email');
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('public_profile');
facebookProvider.addScope('email');

/*
    Auth 내부에서 로그인 여부 확인방법
*/
const checkSignedIn = () => {
    onAuthStateChanged(auth, (user) => {});
    return auth.currentUser;
};

/*
    가장 처음 FB로 로그인 여부를 확인한다
    loading : true -> false로 바꾸는 역할 (얘만 해당 action 가능)
*/
/**
 * 로그인을 확인하는 역할로 가장 먼저 호출되어 로그인 여부를 파악
 * @param {*} dispatchfn
 */
export const initAuth = (dispatchfn) => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            dispatchfn(null);
            return;
        }
        const { uid } = user;
        const userDoc = await getUserByUID(uid);
        dispatchfn({ ...userDoc, uid });
    });
};

/**
 * 이메일과 비밀번호로 로그인하는 방법
 * @param {String} email
 * @param {String} password
 * @returns
 */
export const signInWithEmailPassword = (email, password) => async () => {
    if (process.env.NODE_ENV === 'production') return;
    if (checkSignedIn()) return;

    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = await getUserByUID(credential.user.uid);
        return { ...user, uid: credential.user.uid };
    } catch (err) {
        console.err(err);
    }
};

/**
 * 구글로 로그인하는 방법
 * @returns
 */
export const signInWithGoogle = () => async () => {
    if (checkSignedIn()) return;

    try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token, user);
        return { ...user, uid: credential.user.uid };
    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
        const email = err.customData.email;
        console.log(err);
    }
};

export const signInWithFacebook = () => async () => {
    if (checkSignedIn()) return;

    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token, user);
        return { ...user, uid: credential.user.uid };
    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
        const email = err.customData.email;
        console.log(err);
    }
};

/**
 * firebase 인증정보를 로그아웃한다.
 * @returns
 */
export const signOutFirebase = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};
