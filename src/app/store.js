import { configureStore } from '@reduxjs/toolkit';
import artboardReducer from '../features/ottleMaker/artboardSlice';
import ottleMakerReducer from '../features/ottleMaker/ottleItemSlice';
import ottleActionReducer from '../features/ottleMaker/ottleActionSlice';
import ottleItemDrawerReducer from '../features/ottleMaker/ottleItemDrawer';
import alertReducer from '../features/alert/alertSlice';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
    reducer: {
        artboard: artboardReducer,
        ottleItem: ottleMakerReducer,
        ottleAction: ottleActionReducer,
        ottleItemDrawer: ottleItemDrawerReducer,
        alert: alertReducer,
        modal: modalReducer,
    },
});
