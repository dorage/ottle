export const _ = {};

/**
 * Object의 key들을 반환합니다.
 * @param {*} o
 * @returns
 */
_.keys = (o) => Object.keys(o);

/**
 * 오브젝트 o를 deep copy 해서 반환합니다.
 * @param {*} o
 * @returns
 */
_.deepCopy = (o) =>
    _.keys(o).reduce((newO, k) => {
        if (typeof o[k] === 'object') return { ...newO, [k]: _.deepCopy(o[k]) };
        return { ...newO, [k]: o[k] };
    }, {});

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

/**
 * ms 마다 실행되게 쓰로틀링하는 함수
 * @param {Function} func
 * @param {Number} ms
 * @returns
 */
_.throttle = (func, ms) => {
    let running = false;
    return (...args) => {
        if (running) return;
        running = true;
        func(...args);
        setTimeout(() => (running = false), ms);
    };
};

/**
 * 몇 초 이내의 모든 이벤트를 묶어 마지막으로 호출된 이벤트 단 한 번만 실행합니다.
 * @param {*} func
 * @param {*} ms
 */
_.debouce = (func, ms) => {
    let timeOut;
    return (...args) => {
        if (timeOut) clearTimeout(timeOut);
        timeOut = setTimeout(() => func(...args), ms);
    };
};
