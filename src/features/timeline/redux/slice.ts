import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import OrderMapper from "../../../common/mappers/OrderMapper";
import ColorPool from "../../../common/utils/color/ColorPool";
import { Order, OrderResponse, OrderView } from "../../../entities/Order";
import { TimelineMode, TimelineOptions } from "../../../entities/TimelineOptions";
import { TimelineType } from "../../../entities/TimelineTypes";
import { fetchTimline } from "./asyncActions";


export enum FetchingStatus {
    NEVER,
    LOADING,
    ERROR,
    SUCCESSFULL
}

type TimelineStateType = Exclude<TimelineType, 'loading'>

export interface CellIndeficator {
    time: string,
    roomId: number,
    date: string
}

interface TimelineState {
    mode: TimelineMode,
    type: TimelineStateType,
    options: TimelineOptions
    fetchingStatus: FetchingStatus,
    data: OrderView[],

    isWarningOpen: boolean,
    lastUnselectedItem: CellIndeficator | null

}


const initialState: TimelineState = {
    options: { isFixed: true },

    type: 'default',
    fetchingStatus: FetchingStatus.NEVER,
    data: [],

    //Вынести в другой слайс
    isWarningOpen: false,
    mode: { type: 'idle' },
    lastUnselectedItem: null
}

type UnselectMode = 'hard' | 'light';

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
        },
        insertOrder: (state, action: PayloadAction<Order>) => {
            const insertedOrder =  OrderMapper.fromEntity(action.payload);
            const insertedOrderDuplicateIndex = state.data.findIndex(order => order.id === insertedOrder.id);
            if(~insertedOrderDuplicateIndex){
                state.data = [...state.data.slice(0, insertedOrderDuplicateIndex), insertedOrder, ...state.data.slice(insertedOrderDuplicateIndex+1)];
            }
            else{
                state.data = [...state.data, insertedOrder];
            }
            
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

export const { toggleFixed, toggleTranspose, insertOrder } = timelineSlice.actions;

