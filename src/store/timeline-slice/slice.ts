import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ColorPool from "../../ColorPool";
import { BookingResponse } from "../../entities/BookingResponse";
import { RoomResponse } from "../../entities/RoomResponse";
import TimelineHelper from "../../TimelineHelper";
import { BookingInfo } from "../../types";
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
    roomFetchingStatus: FetchingStatus,
    data: BookingResponse.Booking[],
    rooms: RoomResponse[],
    dataView: Map<number, Map<string, BookingInfo>>
}


const initialState: TimelineState = {
    isFixed: true,
    isTranspose: false,
    data: [],
    dataView: new Map(),
    roomFetchingStatus: FetchingStatus.NEVER,
    rooms: [],
    fetchingStatus: FetchingStatus.NEVER
}

const colorPool: ColorPool = ColorPool.instance;

const timelineSlice = createSlice({
    name: 'TimelineSlice',
    initialState: initialState,
    reducers: {
        toggleTranspose: (state) => {
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
        builder.addCase(fetchTimline.fulfilled, (state, action: PayloadAction<BookingResponse.Booking[]>) => {
            colorPool.init();
            state.fetchingStatus = FetchingStatus.SUCCESSFULL,
            state.data = action.payload;
            state.dataView = TimelineHelper.mapData(state.data);
        }),
        builder.addCase(getRooms.pending, state => {
            state.roomFetchingStatus = FetchingStatus.LOADING
        }),
        builder.addCase(getRooms.fulfilled, (state, action) => {
            state.roomFetchingStatus = FetchingStatus.SUCCESSFULL;
            state.rooms = action.payload;
        })
    },
})


export default timelineSlice.reducer;

export const {toggleFixed, toggleTranspose} = timelineSlice.actions;