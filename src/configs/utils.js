/**
 * 두 좌표 사이의 거리를 구합니다.
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @returns
 */
export const distance = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

/**
 * 최저와 최댓값 사이의 값으로 확정짓습니다.
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 * @returns
 */
export const clamp = (val, min, max) => Math.max(Math.min(val, max), min);

/**
 * DOM Element의 정가운데 좌표를 반환합니다.
 * @param {Element} elem
 * @returns
 */
export const getElementCenter = (elem) => {
    const { left, top, width, height } = elem.getBoundingClientRect();
    return { x: left + width / 2, y: top + height / 2 };
};

/**
 * 좌표의 차이로 각도를 구한다. ← 이 0도
 * @param {*} pivotX
 * @param {*} pivotY
 * @param {*} currX
 * @param {*} currY
 * @returns 0.0 ~ 1.0 사이값으로 반환
 */
export const angle = (pivotX, pivotY, currX, currY) => {
    const radians = Math.atan2(currY - pivotY, currX - pivotX);
    const degree = radians * (180 / Math.PI) + 180;
    return degree / 360;
};

/**
 * 100분율 val을 min~max 범위내로 스케일링합니다.
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 * @returns
 */
export const scalePercent = (val, min, max) => {
    if (min > max) return null;
    return val / (100 / (max - min)) + min;
};

/**
 * context를 가져옵니다
 * @param {*} canvasRef
 * @returns
 */
export const getCtx = (canvasRef) => canvasRef.current.getContext('2d');

/**
 * 이미지 소스를 받아 Image를 로드합니다
 * @param {String} src : ;
 * @param {Function} callback
 * @returns
 */
export const loadImage = (src, callback = (resolve, img) => resolve(img)) =>
    new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = 'Anonymous'; // html canvas toDataURL 오류
        img.onload = () => {
            callback(resolve, img);
        };
    });

const isObject = (o) => {
    return Object.prototype.toString.call(o) === '[object Object]';
};

export const isPlainObject = (o) => {
    var ctor, prot;

    if (isObject(o) === false) return false;

    // If has modified constructor
    ctor = o.constructor;
    if (ctor === undefined) return true;

    // If has modified prototype
    prot = ctor.prototype;
    if (isObject(prot) === false) return false;

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }

    // Most likely a plain Object
    return true;
};
