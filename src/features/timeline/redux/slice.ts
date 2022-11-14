import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import OrderMapper from "../../../common/mappers/OrderMapper";
import ColorPool from "../../../common/utils/color/ColorPool";
import { Order, OrderResponse } from "../../../entities/Order";
import OrderView from "../../../entities/OrderView";
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
    roomId: number
}

interface TimelineState {
    mode: TimelineMode,
    type: TimelineStateType,
    options: TimelineOptions
    fetchingStatus: FetchingStatus,
    data: OrderView[],
}


const initialState: TimelineState = {
    options: { isFixed: false },
    mode: { type: 'idle' },
    type: 'default',
    fetchingStatus: FetchingStatus.NEVER,
    data: [],
}

const colorPool: ColorPool = ColorPool.instance;

const timelineSlice = createSlice({
    name: 'TimelineSlice',
    initialState: initialState,
    reducers: {
        selectCell: (state, action: PayloadAction<CellIndeficator>) => {
            const selectedCell = action.payload;
            let updatedMode: TimelineMode = { ...state.mode };
            if (state.mode.type == 'idle') {
                updatedMode = {
                    type: 'selection',
                    extraData: [selectedCell]
                }
            }
            else {
                const selectedCells = updatedMode.extraData as CellIndeficator[];
                const cellDuplicateIdIndex = selectedCells.findIndex(cellId => cellId.time == selectedCell.time && cellId.roomId == selectedCell.roomId);
                if (!~cellDuplicateIdIndex) {
                    const updatedSelectedCells = selectedCells.filter((cell, index) => index != cellDuplicateIdIndex);
                    if (updatedSelectedCells.length == 0) {
                        state.mode = { type: 'idle' };
                    }
                    else {
                        state.mode.extraData = updatedSelectedCells;
                    }
                }
                else {
                    state.mode.extraData = selectedCells.push(selectedCell);
                }
                updatedMode.extraData = [...selectedCells, selectedCell];
            }
        },
        toggleTranspose: (state, action: PayloadAction<TimelineStateType>) => {
            state.type = action.payload;
            //маппятся данные
        },
        toggleFixed: (state) => {
            state.options.isFixed = !state.options.isFixed;
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            
            state.data = [...state.data, OrderMapper.fromEntity(action.payload)];
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

export const { toggleFixed, toggleTranspose, addOrder } = timelineSlice.actions;