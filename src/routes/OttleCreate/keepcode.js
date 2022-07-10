/**
 * 마우스가 다운되었을 때 기록된 startPointer[clientX, clientY]를 기준으로
 * 현재의 clientX, clientY를 통해 차이를 구하고
 * 시작포인트에 합산해서 item을 업데이트한다.
 * @param {*} x 현재 clientX
 * @param {*} y 현재 clientY
 */
const move = (x, y) => {
    const [sx, sy] = startPointer;
    const [px, py] = movePivot;
    const dx = (x - sx) / artboardSize;
    const dy = (y - sy) / artboardSize;

    const position = {
        x: clamp(px + dx, 0, 1),
        y: clamp(py + dy, 0, 1),
    };

    const item = {
        ...items[selected],
        position,
    };

    dispatch(updateItem(item));
};
/**
 * 마우스가 다운되었을 때 기록된 startPointer[clientX, clientY]를 기준으로
 * 현재의 clientX, clientY 좌표와의 거리를 구하고
 * 기존 item의 scale값에 합산해서 item을 업데이트한다.
 * @param {*} x 현재 clientX
 * @param {*} y 현재 clientY
 */
const scale = (x, y) => {
    const [sx, sy] = startPointer;
    const p = scalePivot;
    const sign = x > sx && y > sy ? -1 : 1;
    const dist = clamp((sign * distance(sx, sy, x, y)) / artboardSize, -1, 10);
    const scale = Math.max(p + dist, 0.1);

    const item = {
        ...items[selected],
        scale,
    };

    dispatch(updateItem(item));
};
/**
 *
 * @param {*} x 현재 clientX
 * @param {*} y 현재 clientY
 */
const rotate = (x, y) => {
    const [sx, sy] = startPointer;
    const [px, py] = rotatePivot;

    const rotation = getRotation(px, py, x, y) - getRotation(px, py, sx, sy);

    const item = { ...items[selected], rotation };
    dispatch(updateItem(item));
};
