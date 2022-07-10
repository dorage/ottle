import { configureStore } from '@reduxjs/toolkit';
import artboardReducer from '../features/ottleMaker/artboardSlice';
import ottleMakerReducer from '../features/ottleMaker/ottleItemSlice';
import ottleActionReducer from '../features/ottleMaker/ottleActionSlice';

export const store = configureStore({
    reducer: {
        artboard: artboardReducer,
        ottleItem: ottleMakerReducer,
        ottleAction: ottleActionReducer,
    },
});
