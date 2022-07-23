const main = '/';
const ottleCreate = '/create-ottle';
const ottleDetail = (id) => (id ? `/ottle/${id}` : `/ottle/:id`);
const ottleEdit = (id) => (id ? `/ottle/${id}/edit` : `/ottle/:id/edit`);
const productDetail = (id) => (id ? `/product/:id` : '/product/:id');
const likes = '/likes';
const groups = '/groups';
const profile = '/profile';
const settings = '/settings';
const pageNotFound = '/page-not-found';

export const routes = {
    main,
    ottleCreate,
    ottleDetail,
    ottleEdit,
    productDetail,
    likes,
    groups,
    profile,
    settings,
    pageNotFound,
};
