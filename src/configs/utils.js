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
