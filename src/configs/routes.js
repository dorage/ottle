// UTILS
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamName(fn, n) {
    var fnStr = fn.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr
        .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
        .match(ARGUMENT_NAMES);
    if (result === null) return result;
    return result[n];
}
const URL = function() {
    const tokens = [];
    for (const arg of arguments) {
        tokens.push(arg[0] === '/' ? arg.slice(1) : arg);
    }
    return `/${tokens.join('/')}`;
};
const param = (obj) => {
    const key = Object.keys(obj)[0];
    return obj[key] === undefined ? `:${key}` : obj[key];
};
/**
 * params 의 key와 value를 뒤집어서 반환합니다.
 * @param {*} params
 * @returns
 */
const reverseParamMap = (params) =>
    Object.keys(params).reduce((acc, key) => {
        acc[params[key]] = key;
        return acc;
    }, {});
export const getOriginUrl = (params, pathname) => {
    const reverseMap = reverseParamMap(params);
    return pathname
        .split('/')
        .map((token) => (reverseMap[token] ? `:${reverseMap[token]}` : token))
        .join('/');
};

// TOKENS
const PROFILE = 'profile';
const USER = 'user';
const OTTLE = 'ottle';
const CREATE = 'create';
const GROUP = 'group';
const GROUPS = 'groups';
const ITEM = 'item';
const LIEKS = 'likes';
const PAGENOTFOUND = 'page-not-found';

// URLS

const main = () => URL();
const profile = () => URL(PROFILE);
const user = (username) => URL(param({ username }));
const ottleCreate = (username, ottleId) =>
    URL(user(username), OTTLE, param({ ottleId }), CREATE);
const ottleDetail = (username, ottleId) =>
    URL(user(username), OTTLE, param({ ottleId }));
const groups = (username) => URL(user(username), GROUPS);
const group = (username, groupId) =>
    URL(user(username), GROUP, param({ groupId }));
const itemDetail = (itemId) => URL(ITEM, param({ itemId }));
const pageNotFound = () => URL(PAGENOTFOUND);

export const routes = {
    main,
    profile,
    user,
    ottleCreate,
    ottleDetail,
    groups,
    group,
    itemDetail,
    pageNotFound,
};
