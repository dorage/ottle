import { configureStore } from '@reduxjs/toolkit';
import artboardReducer from '../features/ottleMaker/artboardSlice';
import ottleMakerReducer from '../features/ottleMaker/ottleItemSlice';
import ottleActionReducer from '../features/ottleMaker/ottleActionSlice';
import ottleItemDrawerReducer from '../features/ottleMaker/ottleItemDrawerSlice';
import ottlePostingReducer from '../features/ottleMaker/ottlePostingSlice';
import alertReducer from '../features/alert/alertSlice';
import modalReducer from '../features/modal/modalSlice';
import screenReducer from '../features/screen/screenSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        screen: screenReducer,
        artboard: artboardReducer,
        ottleItem: ottleMakerReducer,
        ottleAction: ottleActionReducer,
        ottleItemDrawer: ottleItemDrawerReducer,
        ottlePosting: ottlePostingReducer,
        alert: alertReducer,
        modal: modalReducer,
    },
});
