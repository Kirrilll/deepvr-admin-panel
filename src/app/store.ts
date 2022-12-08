import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import timeLineReducer from '../features/timeline/redux/slice';
import datePickerReducer from '../features/date-picker/redux/slice';
import orderCreationReducer from '../features/booking-creator/redux/slice';
import selectionReducer from '../features/selection/redux/slice';
import jobDataReducer from '../features/game/redux/slice';
import warningReducer from '../features/warning-modal/redux/slice';
import warningMiddleware from "../common/middlewares/warningMiddleware";
import replacingReducer from '../features/replacing/slice';

const rootReducer = combineReducers({
    timeLineReducer,
    datePickerReducer,
    orderCreationReducer,
    selectionReducer,
    jobDataReducer,
    replacingReducer,
    warningReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).
            prepend(warningMiddleware)
    });
}


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']