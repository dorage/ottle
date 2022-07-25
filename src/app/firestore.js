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
} from 'firebase/firestore';
import { firestore } from './firebase';

const C_ITEM_CATEGORIES = 'item_categories';

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

export const getUserDoc = async (uid) => {
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return { name: '', email: '' };
    }
};

export const getOttleDocs = async (uid) => {
    const querySnapshot = await getDocs(
        collection(firestore, `users/${uid}/ottles`)
    );
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

export const getThreadDocs = async () => {
    const ottlesQuery = query(collectionGroup(firestore, 'ottles'));
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
 * 아이템 카테고리 최상위 documents 를 가져옵니다.
 * @returns
 */
export const getMainItemCategories = async () => {
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
export const getSubItemCategories = async (path) => {
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
    console.log(pathString, itemCategories);
    return itemCategories;
};

export const getItemsInCategory = async (categoryId) => {
    const itemsQuery = query(
        collection(firestore, C_ITEM_CATEGORIES, categoryId, 'items')
    );
    const querySnapshot = await getDocs(itemsQuery);
    const items = [];
    querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    return items;
};

// ██████████████████████████████████████████████████████████████
//
// 로컬 테스트 용도
//
// ██████████████████████████████████████████████████████████████

if (process.env.NODE_ENV === 'development') {
    const genCategory = (order, id, name, children = []) => ({
        id,
        name,
        order,
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
            genCategory(0, 'shirt', '셔츠'),
            genCategory(1, 'tshirt', '티셔츠'),
            genCategory(2, 'hoodie', '후드티'),
            genCategory(3, 'sweater', '스웨터'),
        ]),
        genCategory(1, 'bottom', '하의', [
            genCategory(0, 'denim', '데님팬츠'),
            genCategory(1, 'cotton', '코튼팬츠'),
            genCategory(2, 'slacks', '정장/슬랙스'),
            genCategory(3, 'slacks', '스커트'),
            genCategory(4, 'trainer', '트레이닝팬츠'),
            genCategory(5, 'shorts', '숏팬츠'),
        ]),
        genCategory(2, 'outer', '아우터', [
            genCategory(0, 'hoodie-zipup', '후드집업'),
            genCategory(1, 'cardigan', '가디건'),
            genCategory(2, 'coat', '코트'),
            genCategory(3, 'jacket', '자켓'),
            genCategory(4, 'blazer', '블레이저'),
        ]),
    ];

    const writeCategoryData = async (categories) => {
        console.log('startToWrite');
        for (const main of categories) {
            const itemCategoriesRef = collection(firestore, C_ITEM_CATEGORIES);
            await setDoc(doc(itemCategoriesRef, main.id), {
                name: main.name,
                order: main.order,
            });
            for (const sub of main.children) {
                const subCategoriesRef = collection(
                    firestore,
                    `item_categories/${main.id}/item_categories`
                );
                await setDoc(doc(subCategoriesRef, sub.id), {
                    name: sub.name,
                    order: sub.order,
                });
            }
        }
    };

    const genItem = () => {};

    const writeItemData = async (items) => {};
}
