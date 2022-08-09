import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export const searchItem = async (term, page = 1) => {
    const search = httpsCallable(functions, 'searchItem');
    return await search({ term, page });
};
