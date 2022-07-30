export const _ = {};

/**
 * n번째 값을 가져옵니다.
 * n이 음수인 경우 역순
 * @param {Array} arr
 * @param {Number} n
 * @returns
 */
_.getIndex = (arr, n) => (n >= 0 ? arr[n] : arr[arr.length + n]);

/**
 * 마지막 값을 가져옵니다
 * @param {Array} arr
 * @returns
 */
_.getLastIndex = (arr) => _.getIndex(arr, -1);

/**
 * condition이 true면 funcA, condition이 false면 funcB를 반환
 * @param {*} condition
 * @param {*} funcA
 * @param {*} funcB
 * @returns
 */
_.condition = (condition, funcA, funcB) => (condition ? funcA : funcB);

/**
 * condition이 true인 경우 _을 val로 치환한 배열을 반환합니다.
 * @param {*} arr
 * @param {*} condition
 * @param {*} val
 */
_.conditionalArray = (arr, condition, val) =>
    arr.reduce((acc, curr) => {
        if (curr === _ && !condition) return acc;
        if (curr === _ && condition) return [...acc, val];
        return [...acc, curr];
    }, []);
