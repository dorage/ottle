import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { C_USERS, C_OTTLES } from './firestore';

// Create a storage reference from our storage service
const storageRef = ref(storage);
const imageRef = ref(storage, 'items/tops/top.png');

export const uploadOttleImage = async (uid, blob) => {
    const storageRef = ref(
        storage,
        `${C_USERS}/${uid}/${C_OTTLES}/${Number(new Date())}`
    );
    const snapshot = await uploadBytes(storageRef, blob);
    return {
        url: await getDownloadURL(snapshot.ref),
        gsUrl: snapshot.ref.fullPath,
    };
};

export const uplaodProfileImage = (user, blob) => {};

/**
 * Google Cloud Storage URI로 download가 가능한 url을 가져오기
 * @param {*} gs
 * @returns
 */
export const gsToURL = async (gs) => {
    const gsRef = ref(storage, gs);
    return await getDownloadURL(gsRef);
};
