import {
    collection,
    collectionGroup,
    query,
    doc,
    getDoc,
    getDocs,
    setDoc,
    Timestamp,
    orderBy,
    limit,
} from 'firebase/firestore';
import { firestore } from './firebase';

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

export const getItemCategories = async () => {
    const itemCategoriesQuery = query(
        collectionGroup(firestore, 'item_categories'),
        orderBy('order')
    );
    const querySnapshot = await getDocs(itemCategoriesQuery);
    const itemCategories = [];
    querySnapshot.forEach((doc) =>
        itemCategories.push({ id: doc.id, ...doc.data() })
    );
    return itemCategories;
};

export const getItemsInCategory = async (categoryId) => {
    const itemsQuery = query(
        collection(firestore, 'item_categories', categoryId, 'items')
    );
    const querySnapshot = await getDocs(itemsQuery);
    const items = [];
    querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    return items;
};

export const writeCitiesData = async () => {
    console.log('startToWrite');
    const citiesRef = collection(firestore, 'cities');
    await setDoc(doc(citiesRef, '5pcAbJa8k7WUTF3qeZkk'), {
        name: 'San Francisco',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 860000,
        regions: ['west_coast', 'norcal'],
    });
    await setDoc(doc(citiesRef, 'LA'), {
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 3900000,
        regions: ['west_coast', 'socal'],
    });
    await setDoc(doc(citiesRef, 'DC'), {
        name: 'Washington, D.C.',
        state: null,
        country: 'USA',
        capital: true,
        population: 680000,
        regions: ['east_coast'],
    });
    await setDoc(doc(citiesRef, 'TOK'), {
        name: 'Tokyo',
        state: null,
        country: 'Japan',
        capital: true,
        population: 9000000,
        regions: ['kanto', 'honshu'],
    });
    await setDoc(doc(citiesRef, 'BJ'), {
        name: 'Beijing',
        state: null,
        country: 'China',
        capital: true,
        population: 21500000,
        regions: ['jingjinji', 'hebei'],
    });
};
