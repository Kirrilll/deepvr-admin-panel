import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import timeLineReducer from '../features/timeline/redux/slice';
import datePickerReducer from '../features/date-picker/redux/slice';
import { timelineApi } from "../repositories/TimelineApi";
import modalReducer from '../features/booking-creator/redux/slice';
import selectionReducer from '../features/selection/redux/slice';

const rootReducer = combineReducers({
    timeLineReducer,
    datePickerReducer,
    modalReducer,
    selectionReducer,
    [timelineApi.reducerPath]: timelineApi.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
            .concat(timelineApi.middleware)
    });
}


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']