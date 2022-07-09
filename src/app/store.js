import { configureStore } from '@reduxjs/toolkit';
import artboardReducer from '../features/ottleMaker/artboardSlice';
import ottleMakerReducer from '../features/ottleMaker/ottleMakerSlice';

export const store = configureStore({
    reducer: {
        artboard: artboardReducer,
        ottleMaker: ottleMakerReducer,
    },
});
