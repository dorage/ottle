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
        return { uid: docSnap.id, ...docSnap.data() };
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
    return { uid: userSnap.docs[0].id, ...userSnap.docs[0].data() };
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
 * @param {*} param0
 */
export const setOttleDoc = async (uid, blob, { title, description, items }) => {
    const ottleRef = collection(firestore, C_OTTLES);
    const { url, gsUrl } = await uploadOttleImage(uid, blob);
    await countUpOttleOfUser(uid);
    await setDoc(doc(ottleRef), {
        uid,
        title,
        description,
        image: { sm: url, md: url, lg: url, original: gsUrl },
        items: items.map((e) => e.product.id),
        created_at: serverTimestamp(),
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

const paginationHoC = (func) => {
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
     *
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
    });
};

/**
 * uid 를 가진 유저의 모든 Ottle을 가져옵니다.
 * @param {*} uid
 * @returns
 */
export const getOttlesByUID = paginationHoC(
    ({ setRef, getRef, queryByRef }) => async (uid) => {
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
 * 메인화면에 표시할 스레드들을 가져옵니다.
 * @returns
 */
export const getMainThreadDocs = paginationHoC(
    ({ setRef, getRef }) => async () => {
        try {
            const mainThreadQuery = getRef()
                ? query(
                      collection(firestore, C_OTTLES),
                      orderBy('created_at', 'desc'),
                      startAfter(getRef()),
                      limit(PAGE_SMALL)
                  )
                : query(
                      collection(firestore, C_OTTLES),
                      orderBy('created_at', 'desc'),
                      limit(PAGE_SMALL)
                  );
            const ottleSnapshot = await getDocs(mainThreadQuery);
            setRef(_.getLastIndex(ottleSnapshot.docs));
            const threads = [];

            for (const ottleDoc of ottleSnapshot.docs) {
                const { uid, created_at, items } = ottleDoc.data();
                const user = await getUserByUID(uid);
                const like = await getOttleLike(uid, ottleDoc.id);
                threads.push({
                    user,
                    ottle: {
                        id: ottleDoc.id,
                        ...ottleDoc.data(),
                        created_at: timestampToDate(created_at),
                    },
                    like,
                });
            }
            return threads;
        } catch (err) {
            console.log(err);
        }
    }
);

/**
 * 아이템 카테고리 최상위 documents 를 가져옵니다.
 * @returns
 */
export const getMainItemCategoryDocs = async () => {
    const itemCategoriesQuery = query(
        collection(firestore, C_ITEM_CATEGORIES),
        orderBy('order')
    );
    const querySnapshot = await getDocs(itemCategoriesQuery);
    const itemCategories = [];
    querySnapshot.forEach((doc) =>
        itemCategories.push({ id: doc.id, ...doc.data() })
    );
    return itemCategories;
};
/**
 * 해당 categoryId를 가진 카테고리의 서브카테고리 documents 를 가져옵니다
 * @param {String[]} path
 */
export const getSubItemCategoryDocs = async (path) => {
    const pathString = path.reduce(
        (acc, curr) => `${acc}/${curr}/${C_ITEM_CATEGORIES}`,
        C_ITEM_CATEGORIES
    );
    const itemCategoriesQuery = query(
        collection(firestore, pathString),
        orderBy('order')
    );
    const querySnapshot = await getDocs(itemCategoriesQuery);
    const itemCategories = [];
    querySnapshot.forEach((doc) =>
        itemCategories.push({ id: doc.id, ...doc.data() })
    );
    return itemCategories;
};
/**
 * itemIds에 포함된 아이템의 리스트를 가져옵니다.
 * @param {*} itemIds
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
export const getItemsRecommend = paginationHoC(
    ({ initRef, setRef, getRef, queryByRef }) => async (firstPage) => {
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
export const getItemsInCategory = paginationHoC(
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

// ██████████████████████████████████████████████████████████████
//
// 로컬 테스트 용도
//
// ██████████████████████████████████████████████████████████████

if (process.env.NODE_ENV === 'development') {
    const genCategory = (level, id, name, children = []) => ({
        id,
        name,
        level,
        children,
    });

    const categories = [
        genCategory(0, 'top', '상의', [
            genCategory('shirt', '셔츠'),
            genCategory('tshirt', '티셔츠'),
            genCategory('hoodie', '후드티'),
            genCategory('sweater', '스웨터'),
        ]),
        genCategory(1, 'top', '하의', [
            genCategory('denim', '데님팬츠'),
            genCategory('cotton', '코튼팬츠'),
            genCategory('slacks', '정장/슬랙스'),
            genCategory('slacks', '스커트'),
            genCategory('trainer', '트레이닝팬츠'),
            genCategory('shorts', '숏팬츠'),
        ]),
        genCategory(2, 'outer', '아우터', [
            genCategory('hoodie-zipup', '후드집업'),
            genCategory('cardigan', '가디건'),
            genCategory('coat', '코트'),
            genCategory('jacket', '자켓'),
            genCategory('blazer', '블레이저'),
        ]),
        genCategory(3, 'set', '세트', [
            genCategory('dress', '원피스'),
            genCategory('suit', '정장/수트'),
            genCategory('sweater', '점프슈트'),
            genCategory('set_etc', '기타세트'),
        ]),
        genCategory(4, 'footwear', '신발', [
            genCategory('sneaker', '운동화'),
            genCategory('shoes', '구두'),
            genCategory('canvas', '단화/캔버스'),
            genCategory('boots', '부츠'),
            genCategory('sandal', '샌달'),
        ]),
        genCategory(5, 'accessory', '악세서리', [
            genCategory('hat', '모자'),
            genCategory('sock', '양말'),
            genCategory('glove', '장갑'),
            genCategory('scarf', '목도리/스카프'),
            genCategory('eyewear', '안경'),
            genCategory('wallet', '지갑'),
            genCategory('watch', '시계'),
            genCategory('bag', '가방'),
        ]),
        genCategory(6, 'jewerly', '쥬얼리', [
            genCategory('necklace', '목걸이'),
            genCategory('ring', '반지'),
            genCategory('earring', '귀걸이'),
            genCategory('bracelet', '팔찌/발찌'),
        ]),
        genCategory(7, 'sticker', '스티커', [
            genCategory('brand', '브랜드'),
            genCategory('reality', '실사'),
        ]),
    ];
    const tempCategory = [
        genCategory(0, 'top', '상의', [
            genCategory(1, 'shirt', '셔츠'),
            genCategory(1, 'tshirt', '티셔츠'),
            genCategory(1, 'hoodie', '후드티'),
            genCategory(1, 'sweater', '스웨터'),
        ]),
        genCategory(0, 'bottom', '하의', [
            genCategory(1, 'denim', '데님팬츠'),
            genCategory(1, 'cotton', '코튼팬츠'),
            genCategory(1, 'slacks', '정장/슬랙스'),
            genCategory(1, 'slacks', '스커트'),
            genCategory(1, 'trainer', '트레이닝팬츠'),
            genCategory(1, 'shorts', '숏팬츠'),
        ]),
        genCategory(0, 'outer', '아우터', [
            genCategory(1, 'hoodie-zipup', '후드집업'),
            genCategory(1, 'cardigan', '가디건'),
            genCategory(1, 'coat', '코트'),
            genCategory(1, 'jacket', '자켓'),
            genCategory(1, 'blazer', '블레이저'),
        ]),
    ];

    const writeCategoryData = async (categories) => {
        console.log('start writting');
        for (let i = 0; i < categories.length; i++) {
            const main = categories[i];
            const itemCategoriesRef = collection(firestore, C_ITEM_CATEGORIES);
            await setDoc(doc(itemCategoriesRef, main.id), {
                name: main.name,
                order: i,
                level: main.level,
            });
            for (let j = 0; j < main.children.length; j++) {
                const sub = main.children[j];
                const subCategoriesRef = collection(
                    firestore,
                    `item_categories/${main.id}/item_categories`
                );
                await setDoc(doc(subCategoriesRef, sub.id), {
                    name: sub.name,
                    order: j,
                    level: sub.level,
                });
            }
        }
        console.log('done writting');
    };

    const genItem = (category, brand, name, link, image) => ({
        category,
        brand,
        name,
        image: { sm: image, md: image, lg: image, original: image },
        link,
    });

    const testItems = [
        genItem(
            ['top', 'shirt'],
            'ENGINEERED GARMENTS',
            '퍼펙트한 셔츠',
            'www.naver.com',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/items%2Faccessories%2Faccessory.jpg?alt=media&token=5fcd4742-889b-459e-8a8c-23557cd0b186'
        ),
        genItem(
            ['top', 'tshirt'],
            'NEEDLES',
            '겁나게 멋진 티샤쓰',
            'www.naver.com',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/items%2Fbottoms%2Fpant.png?alt=media&token=bde997e5-9804-47bf-ad27-1e9151f34798'
        ),
        genItem(
            ['bottom', 'denim'],
            'NUDIE JEAN',
            '누디진 옐로 스티치 데님 팬츠',
            'www.naver.com',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/items%2Fshoes%2Fshoes.png?alt=media&token=020e1ef2-3d3c-459c-9bae-6eaad0269404'
        ),
        genItem(
            ['bottom', 'cotton'],
            'POLO RALPH LAUREN',
            '폴로 된장 코튼 팬츠',
            'www.naver.com',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/items%2Fstickers%2Fsticker.png?alt=media&token=c3dc1eeb-ddb8-4454-9f38-bda636fc4e6f'
        ),
        genItem(
            ['outer', 'hoodie-zipup'],
            'CANADA GOOSE',
            '구스범스 방지 오리털 패딩',
            'www.naver.com',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/items%2Ftops%2Ftop.png?alt=media&token=175cc349-485a-47b5-a27a-c754f62ec53d'
        ),
    ];

    const writeItemData = async (items) => {
        for (const item of items) {
            const itemRef = collection(firestore, C_ITEMS);
            await setDoc(doc(itemRef), item);
        }
    };

    const genOttle = (uid, title, description, image) => ({
        uid,
        title,
        description,
        items: ['7NnBHVC1HkPKJSF8Pay2'],
        image: {
            sm: image,
            md: image,
            lg: image,
            original: image,
        },
    });

    const testOttles = [
        genOttle(
            'ACa0Zv6C2lfmpUqeP5cpKhtpd2dy',
            '2022 핫한 섬머룩 #1',
            '',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/users%2FsnUitsNBCaFldTHfdP8gkWbUBSs9%2Fottles%2Ftester_2.jpg?alt=media&token=aaed0307-bc94-41f9-8610-4850d3f187f8'
        ),
        genOttle(
            'ACa0Zv6C2lfmpUqeP5cpKhtpd2dy',
            '2022 핫한 섬머룩 #2',
            '',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/users%2FsnUitsNBCaFldTHfdP8gkWbUBSs9%2Fottles%2Ftester_1.jpg?alt=media&token=10388046-8200-4f12-943d-f6ad18fc0faf'
        ),
        genOttle(
            'snUitsNBCaFldTHfdP8gkWbUBSs9',
            '2학기에 이렇게만 입고 놀러가자',
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/users%2FsnUitsNBCaFldTHfdP8gkWbUBSs9%2Fottles%2Flook.jpg?alt=media&token=34a7c79a-4720-4a37-a0ac-870d3eec72e8'
        ),
        genOttle(
            'snUitsNBCaFldTHfdP8gkWbUBSs9',
            '회사에서 패션으로 이름좀 떨치고 싶다면',
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/users%2FsnUitsNBCaFldTHfdP8gkWbUBSs9%2Fottles%2F1658815405117?alt=media&token=4459b08e-b425-4f88-ae8e-1a143546a91b'
        ),
        genOttle(
            'snUitsNBCaFldTHfdP8gkWbUBSs9',
            '개강하면 동기들 기강잡는 룩',
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'http://localhost:9199/v0/b/ottle-47f85.appspot.com/o/users%2FsnUitsNBCaFldTHfdP8gkWbUBSs9%2Fottles%2F1658815320974?alt=media&token=179fb772-d71c-4a4e-9698-3547fe285095'
        ),
    ];

    const writeOttleData = async (ottles) => {
        for (const ottle of ottles) {
            const ottleRef = collection(firestore, C_OTTLES);
            await setDoc(doc(ottleRef), {
                ...ottle,
                created_at: serverTimestamp(),
            });
        }
        console.log('done! writeOttleData');
    };
    /*
    Array(40)
        .fill()
        .forEach(() => writeOttleData([testOttles[4]]));
    */
}
