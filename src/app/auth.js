import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from './firebase';
import { getUserDoc, writeCitiesData } from './firestore';

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
        const userDoc = await getUserDoc(uid);
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
    if (checkSignedIn()) return;

    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = await getUserDoc(credential.user.uid);
        return { ...user, uid: credential.user.uid };
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
