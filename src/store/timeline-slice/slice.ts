import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ColorPool from "../../ColorPool";
import BookingResponse from "../../entities/Booking";
import BookingView from "../../entities/BookingView";
import RoomResponse, { Room } from "../../entities/Room";
import TimelineHelper from "../../TimelineHelper";
import { fetchTimline, getRooms } from "./asyncActions";


export enum FetchingStatus{
    NEVER,
    LOADING,
    ERROR,
    SUCCESSFULL 
}

interface TimelineState{
    isFixed: boolean,
    isTranspose: boolean,
    fetchingStatus: FetchingStatus,
    data: BookingResponse,
    dataView: Map<number, Map<string, BookingView>>
}


const initialState: TimelineState = {
    isFixed: true,
    isTranspose: false,
    data: [],
    dataView: new Map(),
    fetchingStatus: FetchingStatus.NEVER
}

const colorPool: ColorPool = ColorPool.instance;

const timelineSlice = createSlice({
    name: 'TimelineSlice',
    initialState: initialState,
    reducers: {
        toggleTranspose: (state, action) => {
            state.isTranspose = !state.isTranspose
            //маппятся данные
        },
        toggleFixed: (state) => {
            state.isFixed = !state.isFixed
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTimline.pending, (state) => {
            state.fetchingStatus = FetchingStatus.LOADING
        }),
        builder.addCase(fetchTimline.fulfilled, (state, action: PayloadAction<BookingResponse>) => {
            colorPool.init();
            state.fetchingStatus = FetchingStatus.SUCCESSFULL,
            state.data = action.payload;
            state.dataView = TimelineHelper.mapData(state.data);
        })
    },
})


export default timelineSlice.reducer;

export const {toggleFixed, toggleTranspose} = timelineSlice.actions;