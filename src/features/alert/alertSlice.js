import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const ALERTS = {
    ottleCreate: {
        noItem: '아이템을 2개 이상 추가해주세요',
        tooManyItem: `18개 이상의 아이템을 사용할 수 없습니다`,
        noTitle: `타이틀을 입력해주세요`,
    },
    ottleDetail: {
        copied: '링크 복사완료',
        unknownSeller: '판매처가 확인되지 않습니다',
    },
};

const ALERT_DURATION = 1.5; // 1.5초

const initialState = {
    alert: false,
    message: undefined,
    queue: [],
};

/**
 * sec만큼 기다린뒤 fulfilled되는 Promise를 반환
 * @param {Number} sec
 * @returns
 */
const timer = (sec) =>
    new Promise((resolve) => setTimeout(() => resolve(true), sec * 1000));

const removeAlert = createAsyncThunk(
    'alert/removeAlert',
    async (_, { dispatch, getState }) => {
        await timer(ALERT_DURATION);
        const { queue } = selectAlert(getState());
        if (queue.length) {
            dispatch(
                alertSlice.actions.nextQueue({
                    message: queue[0],
                    queue: queue.slice(1),
                })
            );
            // 다음 메시지를 위해 다시 실행
            dispatch(removeAlert());
        } else {
            dispatch(alertSlice.actions.endAlert());
        }

        return true;
    }
);

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.alert = true;
            state.message = action.payload;
        },
        addQueue: (state, action) => {
            state.queue = action.payload;
        },
        nextQueue: (state, action) => {
            const { message, queue } = action.payload;
            state.alert = true;
            state.message = message;
            state.queue = queue;
        },
        endAlert: (state) => {
            state.alert = false;
            state.message = undefined;
            state.queue = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeAlert.fulfilled, (state, action) => {
            // do something
        });
    },
});

export const broadcastAlert = (message) => (dispatch, getState) => {
    const { alert, queue } = selectAlert(getState());
    if (alert) {
        dispatch(alertSlice.actions.addQueue([...queue, message]));
    } else {
        dispatch(alertSlice.actions.addMessage(message));
        dispatch(removeAlert());
    }
};

export const selectAlert = (state) => state.alert;
export default alertSlice.reducer;
