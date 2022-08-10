import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export const searchItem = async (term, page = 1, category = []) => {
    const search = httpsCallable(functions, 'searchItem');
    const mainCategory = category.length > 0 ? category[0].id : undefined;
    const subCategory = category.length > 1 ? category[1].id : undefined;

    return await search({ term, page, mainCategory, subCategory });
};
