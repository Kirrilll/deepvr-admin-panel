import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import OrderMapper from "../../../common/mappers/OrderMapper";
import ColorPool from "../../../common/utils/ColorPool";
import { OrderResponse } from "../../../entities/Order";
import OrderView, { OrderMatrix } from "../../../entities/OrderView";
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
    data: OrderView[],
    orderMatrix: OrderMatrix
}


const initialState: TimelineState = {
    options: {isFixed: false},
    mode: {type: 'idle'},
    type: 'default',
    fetchingStatus: FetchingStatus.NEVER,
    data: [],
    orderMatrix: [[]]
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
        builder.addCase(fetchTimline.fulfilled, (state, action: PayloadAction<OrderResponse>) => {
            colorPool.init();
            state.fetchingStatus = FetchingStatus.SUCCESSFULL,
            state.data = OrderMapper.fromEntities(action.payload);
        })
    },
})


export default timelineSlice.reducer;

export const {toggleFixed, toggleTranspose} = timelineSlice.actions;