import {
    collection,
    collectionGroup,
    query,
    doc,
    getDoc,
    getDocs,
    setDoc,
    Timestamp,
    where,
    orderBy,
    limit,
    serverTimestamp,
} from 'firebase/firestore';
import { firestore } from './firebase';
import { uploadOttleImage } from './storage';

export const C_USERS = 'users';
export const C_ITEM_CATEGORIES = 'item_categories';
export const C_ITEMS = 'items';
export const C_OTTLES = 'ottles';

const timestampToDate = (timestamp) => {
    const date = timestamp.toDate();
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate() + 1,
    };
};
const dateToTimestamp = (date) => {
    return Timestamp.fromDate(date);
};

/**
 * user 정보를 가져옵니다
 * @param {*} uid
 * @returns
 */
export const getUserDoc = async (uid) => {
    const docRef = doc(firestore, C_USERS, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return { name: '', email: '' };
    }
};

export const getMyOttleDoc = async (uid, ottleId) => {
    const docRef = doc(firestore, C_USERS, uid, C_OTTLES, ottleId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error('없는 옷뜰입니다');
    }
};

export const getUserOttleDoc = async (ottleId, user_id) => {
    const userRef = query(
        collection(firestore, C_USERS),
        where('id', '==', 'user_id')
    );
};

/**
 * uid 를 가진 유저의 모든 Ottle을 가져옵니다.
 * @param {*} uid
 * @returns
 */
export const getOttleDocs = async (uid) => {
    const ottlesQuery = query(
        collection(firestore, C_USERS, uid, C_OTTLES),
        orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(ottlesQuery);
    const ottles = [];
    querySnapshot.forEach((doc) => {
        ottles.push({
            id: doc.id,
            ...doc.data(),
            created_at: timestampToDate(doc.data().created_at),
        });
    });
    return ottles;
};

/**
 * uid의 유저에 새로운 Ottle을 저장합니다
 * @param {*} param0
 */
export const setOttleDoc = async (uid, blob, { title, description }) => {
    const ottleRef = collection(firestore, C_USERS, uid, C_OTTLES);
    const { url, gsUrl } = await uploadOttleImage(uid, blob);
    await setDoc(doc(ottleRef), {
        title,
        description,
        image: { sm: url, md: url, lg: url, original: gsUrl },
        created_at: serverTimestamp(),
    });
};

/**
 * 메인화면에 표시할 스레드들을 가져옵니다.
 * @returns
 */
export const getMainThreadDocs = async () => {
    const ottlesQuery = query(collectionGroup(firestore, 'ottles'));
    const ottleSnapshot = await getDocs(ottlesQuery);
    const threads = [];

    for (const doc of ottleSnapshot.docs) {
        const makerSnapshot = await getDoc(doc.ref.parent.parent);
        const { profile_src, name } = makerSnapshot.data();

        threads.push({
            maker: { id: makerSnapshot.id, name, profile_src },
            ottle: {
                id: doc.id,
                ...doc.data(),
                created_at: timestampToDate(doc.data().created_at),
            },
        });
    }

    return threads;
};

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
 * 카테고리 선정 이전에 표시될 아이템을 가져옵니다.
 * @returns
 */
export const getItemsRecommend = async () => {
    const itemsQuery = query(collection(firestore, C_ITEMS), limit(24));
    const querySnapshot = await getDocs(itemsQuery);
    const items = [];
    querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    console.log(items);
    return items;
};

/**
 * 해당 카테고리에 포함된 아이템을 가져옵니다
 * @param {*} categoryId
 * @returns
 */
export const getItemsInCategory = async (categoryId) => {
    const itemsQuery = query(
        collection(firestore, C_ITEMS),
        where('category', 'array-contains', categoryId),
        limit(24)
    );
    const querySnapshot = await getDocs(itemsQuery);
    const items = [];
    querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    console.log(items);
    return items;
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

    const items = [
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
}
