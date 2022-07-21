import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from './firebase';

/*
    Auth 내부에서 로그인 여부 확인방법
*/
const checkSignedIn = () => {
    onAuthStateChanged(auth, (user) => {});
    console.log(auth.currentUser);
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
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            dispatchfn(null);
            return;
        }
        const { displayName, email, uid } = user;
        console.log(displayName, email, uid);
        dispatchfn({ name: displayName || 'unnamed', email, uid });
    });
};

/**
 * 이메일과 비밀번호로 로그인하는 방법
 * @param {String} email
 * @param {String} password
 * @returns
 */
export const signInWithEmailPassword = (email, password) => async () => {
    if (checkSignedIn()) return;

    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log(credential);
        console.log(credential.user);
        return credential.user;
    } catch (err) {
        console.err(err);
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
