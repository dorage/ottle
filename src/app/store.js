import { configureStore } from '@reduxjs/toolkit';
import artboardReducer from '../features/ottleMaker/artboardSlice';
import ottleMakerReducer from '../features/ottleMaker/ottleItemSlice';
import ottleActionReducer from '../features/ottleMaker/ottleActionSlice';
import itemDrawerReducer from '../features/ottleMaker/itemDrawerSlice';
import itemDrawerItemsReducer from '../features/ottleMaker/itemDrawerItemsSlice';
import itemDrawerCategoryReducer from '../features/ottleMaker/itemDrawerCategorySlice';
import itemDrawerSearchReducer from '../features/ottleMaker/itemDrawerSearchSlice';
import ottlePostingReducer from '../features/ottleMaker/ottlePostingSlice';
import alertReducer from '../features/alert/alertSlice';
import modalReducer from '../features/modal/modalSlice';
import screenReducer from '../features/screen/screenSlice';
import userReducer from '../features/user/userSlice';
import threadReducer from '../features/main/ThreadSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        screen: screenReducer,
        artboard: artboardReducer,
        ottleItem: ottleMakerReducer,
        ottleAction: ottleActionReducer,
        itemDrawer: itemDrawerReducer,
        itemDrawerItems: itemDrawerItemsReducer,
        itemDrawerCategory: itemDrawerCategoryReducer,
        itemDrawerSearch: itemDrawerSearchReducer,
        ottlePosting: ottlePostingReducer,
        alert: alertReducer,
        modal: modalReducer,
        thread: threadReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {},
        }),
});
