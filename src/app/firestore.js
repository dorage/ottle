import { async } from '@firebase/util';
import {
    collection,
    collectionGroup,
    query,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    increment,
    Timestamp,
    where,
    orderBy,
    startAt,
    startAfter,
    endBefore,
    limit,
    serverTimestamp,
    documentId,
} from 'firebase/firestore';
import { _ } from '../utils/fp';
import { firestore } from './firebase';
import { uploadOttleImage } from './storage';

export const C_USERS = 'users';
export const C_ITEM_CATEGORIES = 'item_categories';
export const C_ITEMS = 'items';
export const C_OTTLES = 'ottles';
export const C_OTTLELIKES = 'ottle_likes';
export const C_ITEMLIKES = 'item_likes';

export const PAGE_SMALL = 4;
export const PAGE = 24;

const timestampToDate = (timestamp) => {
    if (timestamp === null || timestamp === undefined) return `방금 전`;
    const date = timestamp.toDate();
    return `${date.getDate() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`;
};
const dateToTimestamp = (date) => {
    return Timestamp.fromDate(date);
};

export const checkUsername = async (username) => {
    const ref = query(
        collection(firestore, C_USERS),
        where('username', '==', username)
    );
    const snapshot = await getDocs(ref);
    return !snapshot.empty;
};

export const setUserInfo = async (uid, { name, username }) => {
    const docRef = doc(firestore, C_USERS, uid);
    await updateDoc(docRef, { is_registered: true, name, username });
    return true;
};

/**
 * user 정보를 가져옵니다
 * @param {*} uid
 * @returns
 */
export const getUserByUID = async (uid) => {
    const docRef = doc(firestore, C_USERS, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {
            uid: docSnap.id,
            ...docSnap.data(),
            created_at: timestampToDate(docSnap.data().created_at),
        };
    } else {
        return null;
    }
};

export const getUserByUsername = async (username) => {
    const userRef = query(
        collection(firestore, C_USERS),
        where('username', '==', username)
    );
    const userSnap = await getDocs(userRef);
    if (!userSnap.docs.length) throw new Error('there has no user');
    const user = userSnap.docs[0];
    return {
        uid: user.id,
        ...user.data(),
        created_at: timestampToDate(user.data().created_at),
    };
};

/**
 * ottleId로 ottle의 정보를 가져옵니다.
 * @param {*} ottleId
 * @returns
 */
export const getOttleById = async (ottleId) => {
    const ottleRef = doc(firestore, C_OTTLES, ottleId);
    const ottleSnap = await getDoc(ottleRef);
    return { id: ottleSnap.id, ...ottleSnap.data() };
};
/**
 * nanoId와 uid로 ottle의 정보를 가져옵니다.
 * @param {*} uid
 * @param {*} nanoId
 * @returns
 */
export const getOttleByNanoId = async (uid, nanoid) => {
    const ottleRef = query(
        collection(firestore, C_OTTLES),
        where('uid', '==', uid),
        where('isPrivate', '==', false),
        where('nanoid', '==', nanoid)
    );
    const ottleSnap = await getDocs(ottleRef);

    if (ottleSnap.empty) return null;

    const ottles = [];
    ottleSnap.forEach((doc) => {
        const { created_at } = doc.data();
        ottles.push({
            id: doc.id,
            ...doc.data(),
            created_at: timestampToDate(created_at),
        });
    });
    return ottles.shift();
};
/**
 * nanoId와 uid로 ottle의 정보를 가져옵니다.
 * @param {*} uid
 * @param {*} nanoId
 * @returns
 */
export const getMyOttleByNanoId = async (uid, nanoid) => {
    const ottleRef = query(
        collection(firestore, C_OTTLES),
        where('uid', '==', uid),
        where('nanoid', '==', nanoid)
    );
    const ottleSnap = await getDocs(ottleRef);

    if (ottleSnap.empty) return null;

    const ottles = [];
    ottleSnap.forEach((doc) => {
        const { created_at } = doc.data();
        ottles.push({
            id: doc.id,
            ...doc.data(),
            created_at: timestampToDate(created_at),
        });
    });
    return ottles.shift();
};

export const getOttleForLanding = async () => {
    const ottleRef = query(collection(firestore, C_OTTLES), limit(10));
    const ottleSnap = await getDocs(ottleRef);

    const ottles = [];
    ottleSnap.forEach((doc) => {
        const { created_at } = doc.data();
        ottles.push({
            id: doc.id,
            ...doc.data(),
            created_at: timestampToDate(created_at),
        });
    });
    return ottles;
};

/**
 * 오뜰의 상세 정보를 가져옵니다
 * @param {*} username
 * @param {*} ottleId
 * @returns
 */
export const getOttleDetail = async (username, ottleId) => {
    const user = await getUserByUsername(username);
    const ottle = await getOttleById(ottleId);
    const items = await getItemsById(ottle.items);
    const like = await getOttleLike(user.uid, ottleId);
    // TODO; like여부나 댓글등의 자료도 가져와야함.

    return { user, ottle, items, like };
};

export const hideOttle = async () => {};
export const deleteOttle = async () => {};

/**
 * 오뜰 개수 추가
 * @param {*} uid
 */
const countUpOttleOfUser = async (uid) => {
    const userRef = doc(firestore, C_USERS, uid);
    await updateDoc(userRef, { ottle_count: increment(1) });
};

/**
 * uid의 유저에 새로운 Ottle을 포스팅합니다.
 * @param {string} uid
 * @param {*} blob
 * @param {object[]} items
 * @param {import('../features/ottleMaker/ottlePostingSlice').PostingData} form
 */
export const setOttleDoc = async (uid, blob, items, form) => {
    const ottleRef = collection(firestore, C_OTTLES);
    const { url } = await uploadOttleImage(uid, blob);
    await countUpOttleOfUser(uid);

    await setDoc(doc(ottleRef), {
        uid,
        image: { original: url },
        items: items.map((e) => e.product.id),
        created_at: serverTimestamp(),
        ...form,
    });
};

/**
 * 내가 좋아요를 누른 모든 옷뜰을 찾아옵니다.
 * @param {*} uid
 * @returns
 */
export const getLikedOttles = async (uid) => {
    const ref = query(
        collection(firestore, C_OTTLELIKES),
        where('uid', '==', uid),
        orderBy('created_at', 'desc'),
        limit(PAGE)
    );
    const querySnapshot = await getDocs(ref);
    const ottles = [];
    querySnapshot.forEach((doc) => {
        const { created_at } = doc.data();
        ottles.push({
            id: doc.id,
            ...doc.data(),
            created_at: timestampToDate(created_at),
        });
    });

    return ottles;
};

const memoizeHoC = (func) => {
    let lastRef = null;
    let context = {};
    const initRef = () => {
        lastRef = null;
    };
    const setRef = (docRef) => {
        lastRef = docRef;
    };
    const getRef = () => {
        return lastRef;
    };
    /**
     * Ref가 있는지 없는지에 따라 query 방식을 다르게 합니다.
     * initialQuery에 포함된 _ 가 기존에 쿼리했던 레퍼런스가 있다면
     * pagingQuery로 교체되어 pagination 과정의 커서로 사용됩니다
     * @param {Array} initialQueries
     * @param {Query} pagingQuery
     * @returns
     */
    const queryByRef = (initialQueries, pagingQuery) => {
        return getDocs(
            query(..._.conditionalArray(initialQueries, getRef(), pagingQuery))
        );
    };
    /**
     * 기타 페이징 관련 정보를 저장합니다.
     * @param {*} obj
     */
    const setContext = (obj) => {
        if (typeof obj !== 'object') return;
        context = { ...context, ...obj };
    };
    /**
     * 컨텍스트에 정보를 저장합니다
     * @param {*} keys
     */
    const deleteContext = (...keys) => {
        keys.forEach((key) => context[key] && delete context[key]);
    };
    /**
     * 기타 페이징 관련 정보를 불러옵니다.
     * @returns
     */
    const getContext = () => ({ ...context });
    return func({
        initRef,
        setRef,
        getRef,
        queryByRef,
        setContext,
        getContext,
        deleteContext,
    });
};

/**
 * uid 를 가진 유저의 모든 Ottle을 가져옵니다.
 * @param {*} uid
 * @returns
 */
export const getOttlesByUID = memoizeHoC(
    ({ initRef, setRef, getRef, queryByRef }) => async (
        uid,
        firstPage = false
    ) => {
        if (firstPage) initRef();
        const querySnapshot = await queryByRef(
            [
                collection(firestore, C_OTTLES),
                where('uid', '==', uid),
                where('isPrivate', '==', false),
                orderBy('created_at', 'desc'),
                _,
                limit(PAGE),
            ],
            startAfter(getRef())
        );

        if (querySnapshot.empty) return [];
        setRef(_.getLastIndex(querySnapshot.docs));

        const ottles = [];
        querySnapshot.forEach((doc) => {
            const { created_at } = doc.data();
            ottles.push({
                id: doc.id,
                ...doc.data(),
                created_at: timestampToDate(created_at),
            });
        });
        return ottles;
    }
);

/**
 * uid 를 가진 유저의 모든 Ottle을 가져옵니다.
 * @param {*} uid
 * @returns
 */
export const getMyOttles = memoizeHoC(
    ({ initRef, setRef, getRef, queryByRef }) => async (
        uid,
        firstPage = false
    ) => {
        if (firstPage) initRef();
        const querySnapshot = await queryByRef(
            [
                collection(firestore, C_OTTLES),
                where('uid', '==', uid),
                orderBy('created_at', 'desc'),
                _,
                limit(PAGE),
            ],
            startAfter(getRef())
        );

        if (querySnapshot.empty) return [];
        setRef(_.getLastIndex(querySnapshot.docs));

        const ottles = [];
        querySnapshot.forEach((doc) => {
            const { created_at } = doc.data();
            ottles.push({
                id: doc.id,
                ...doc.data(),
                created_at: timestampToDate(created_at),
            });
        });
        return ottles;
    }
);

/**
 * uid 를 가진 유저의 모든 Ottle을 가져옵니다.
 * @param {*} uid
 * @returns
 */
export const getOttlesByUsername = memoizeHoC(
    ({ initRef, setRef, getRef, queryByRef }) => async (
        username,
        firstPage = false
    ) => {
        if (firstPage) initRef();
        const { uid } = await getUserByUsername(username);
        const querySnapshot = await queryByRef(
            [
                collection(firestore, C_OTTLES),
                where('uid', '==', uid),
                orderBy('created_at', 'desc'),
                _,
                limit(PAGE),
            ],
            startAfter(getRef())
        );

        if (querySnapshot.empty) return [];
        setRef(_.getLastIndex(querySnapshot.docs));

        const ottles = [];
        querySnapshot.forEach((doc) => {
            const { created_at } = doc.data();
            ottles.push({
                id: doc.id,
                ...doc.data(),
                created_at: timestampToDate(created_at),
            });
        });
        return ottles;
    }
);

/**
 * 카테고리 ID를 키로 한 전체 카테고리 목록을 반환합니다
 */
export const getAllItemCategoryDocs = memoizeHoC(
    ({ setContext, getContext }) => async () => {
        try {
            if (getContext().categories) return getContext().categories;
            const categoriesRef = collectionGroup(firestore, C_ITEM_CATEGORIES);
            const snapshot = await getDocs(categoriesRef);
            const categories = {};
            snapshot.forEach((doc) => {
                categories[doc.id] = { id: doc.id, ...doc.data() };
            });
            setContext({ categories });

            return categories;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
);

/**
 * 아이템 카테고리 최상위 documents 를 가져옵니다.
 * @returns
 */
export const getMainItemCategoryDocs = memoizeHoC(
    ({ setContext, getContext }) => async () => {
        try {
            if (getContext().categories) return getContext().categories;
            const itemCategoriesQuery = query(
                collection(firestore, C_ITEM_CATEGORIES),
                orderBy('order')
            );
            const querySnapshot = await getDocs(itemCategoriesQuery);
            const categories = [];
            querySnapshot.forEach((doc) =>
                categories.push({ id: doc.id, ...doc.data() })
            );
            setContext({ categories });
            return categories;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
);
/**
 * 해당 categoryId를 가진 카테고리의 서브카테고리 documents 를 가져옵니다
 * @param {String[]} path
 */
export const getSubItemCategoryDocs = memoizeHoC(
    ({ setContext, getContext }) => async (path) => {
        try {
            if (getContext()[path]) return getContext()[path];
            const pathString = path.reduce(
                (acc, curr) => `${acc}/${curr}/${C_ITEM_CATEGORIES}`,
                C_ITEM_CATEGORIES
            );
            const itemCategoriesQuery = query(
                collection(firestore, pathString),
                orderBy('order')
            );
            const querySnapshot = await getDocs(itemCategoriesQuery);
            const categories = [];
            querySnapshot.forEach((doc) =>
                categories.push({ id: doc.id, ...doc.data() })
            );
            setContext({ [path]: categories });
            return categories;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
);
/**
 * itemIds에 포함된 아이템의 리스트를 가져옵니다.
 * @param {Array} itemIds
 */
export const getItemsById = async (itemIds = []) => {
    const itemsRef = query(
        collection(firestore, C_ITEMS),
        where(documentId(), 'in', itemIds)
    );
    const itemsSnap = await getDocs(itemsRef);
    const items = [];
    itemsSnap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    return items;
};
/**
 * 카테고리 선정 이전에 표시될 아이템을 가져옵니다.
 * @returns
 */
export const getItemsRecommend = memoizeHoC(
    ({ initRef, setRef, getRef, queryByRef }) => async (firstPage = false) => {
        if (firstPage) {
            initRef();
        }
        const querySnapshot = await queryByRef(
            [collection(firestore, C_ITEMS), _, limit(PAGE)],
            startAfter(getRef())
        );

        if (querySnapshot.empty) return [];
        setRef(_.getLastIndex(querySnapshot.docs));

        const items = [];
        querySnapshot.forEach((doc) =>
            items.push({ id: doc.id, ...doc.data() })
        );
        return items;
    }
);
/**
 * 해당 카테고리에 포함된 아이템을 가져옵니다
 * @param {*} categoryId
 * @returns
 */
export const getItemsInCategory = memoizeHoC(
    ({ initRef, setRef, getRef, queryByRef, setContext, getContext }) => async (
        categoryId,
        firstPage = false
    ) => {
        if (firstPage) {
            setContext({ [categoryId]: undefined });
            initRef();
        }
        if (getContext()[categoryId]) {
            setRef(getContext()[categoryId]);
        }
        const querySnapshot = await queryByRef(
            [
                collection(firestore, C_ITEMS),
                where('category', 'array-contains', categoryId),
                _,
                limit(PAGE),
            ],
            startAfter(getRef())
        );

        if (querySnapshot.empty) return [];
        setContext({ [categoryId]: _.getLastIndex(querySnapshot.docs) });

        const items = [];
        querySnapshot.forEach((doc) =>
            items.push({ id: doc.id, ...doc.data() })
        );
        return items;
    }
);

export const getFollow = async () => {};
export const setFollow = async () => {};
export const deleteFollow = async () => {};

/**
 * ottle의 like여부를 가져옵니다.
 * @param {*} uid
 * @param {*} ottleId
 * @returns
 */
export const getOttleLike = async (uid, ottleId) => {
    const ref = query(
        collection(firestore, C_OTTLELIKES),
        where('uid', '==', uid),
        where('ottle_id', '==', ottleId)
    );
    const snap = await getDocs(ref);
    return !snap.empty;
};
export const setOttleLike = async (uid, ottleId) => {
    const ref = collection(firestore, C_OTTLELIKES);
    await setDoc(doc(ref), {
        uid,
        ottle_id: ottleId,
        created_at: serverTimestamp(),
    });
};
export const deleteOttleLike = async (uid, ottleId) => {
    const ref = query(
        collection(firestore, C_OTTLELIKES),
        where('uid', '==', uid),
        where('ottle_id', '==', ottleId)
    );
    const snaps = await getDocs(ref);
    const promises = [];
    snaps.forEach((doc) => promises.push(deleteDoc(doc.ref)));
    await Promise.all(promises);
};
