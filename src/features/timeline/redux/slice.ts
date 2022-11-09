import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ColorPool from "../../../common/utils/ColorPool";
import BookingResponse from "../../../entities/Booking";
import BookingView from "../../../entities/BookingView";
import { TimelineMode, TimelineOptions } from "../../../entities/TimelineOptions";
import { TimelineType } from "../../../entities/TimelineTypes";
import { fetchTimline } from "./asyncActions";


export enum FetchingStatus{
    NEVER,
    LOADING,
    ERROR,
    SUCCESSFULL 
}

type TimelineStateType = Exclude<TimelineType, 'loading'>

interface TimelineState{
    mode: TimelineMode,
    type: TimelineStateType,
    options: TimelineOptions
    fetchingStatus: FetchingStatus,
    data: BookingResponse,
    dataView: Map<number, Map<string, BookingView>>
}


const initialState: TimelineState = {
    options: {isFixed: false},
    mode: {type: 'idle'},
    type: 'default',
    fetchingStatus: FetchingStatus.NEVER,
    data: [],
    dataView: new Map()
}

const colorPool: ColorPool = ColorPool.instance;

const timelineSlice = createSlice({
    name: 'TimelineSlice',
    initialState: initialState,
    reducers: {
        toggleTranspose: (state, action: PayloadAction<TimelineStateType>) => {
            state.type = action.payload;
            //маппятся данные
        },
        toggleFixed: (state) => {
            state.options.isFixed = !state.options.isFixed;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTimline.pending, (state) => {
            state.fetchingStatus = FetchingStatus.LOADING;
        }),
        builder.addCase(fetchTimline.fulfilled, (state, action: PayloadAction<BookingResponse>) => {
            colorPool.init();
            state.fetchingStatus = FetchingStatus.SUCCESSFULL,
            state.data = action.payload;
            // state.dataView = BookingMapper.mapData(state.data);
        })
    },
})


export default timelineSlice.reducer;

export const {toggleFixed, toggleTranspose} = timelineSlice.actions;