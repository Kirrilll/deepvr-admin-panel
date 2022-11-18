import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import TimeHelper from "../../../common/helpers/TimeHelper";
import OrderMapper from "../../../common/mappers/OrderMapper";
import ColorPool from "../../../common/utils/color/ColorPool";
import { Order, OrderResponse } from "../../../entities/Order";
import OrderView from "../../../entities/OrderView";
import { TimelineMode, TimelineOptions } from "../../../entities/TimelineOptions";
import { TimelineType } from "../../../entities/TimelineTypes";
import { fetchTimline } from "./asyncActions";
import { selectedCellsSelector } from "./selectors";


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
        unselectCell: (state, action: PayloadAction<{ cell: CellIndeficator, mode: UnselectMode }>) => {
            const { cell, mode } = action.payload;
            const unselectedItem = cell;
            let selectedCells = [...state.mode.extraData] as CellIndeficator[];
            const unselectedItemIndex = selectedCells
                .findIndex(cell => cell.roomId == unselectedItem.roomId && cell.time == unselectedItem.time);
            selectedCells = [
                ...selectedCells.slice(0, unselectedItemIndex),
                ...selectedCells.slice(unselectedItemIndex + 1)
            ];

            if (selectedCells.length == 0) {
                state.mode = { type: 'idle' };
            }
            else {
                let isSequence = true;
                const sortedCells = selectedCells
                    .sort((prev, next) => TimeHelper.getTimeDiff(prev.time, next.time));

                for(let i =0; i < sortedCells.length; i++) {
                    const isLast = i  == sortedCells.length -1;
                    if(!isLast && !TimeHelper.isNextOrPrev(sortedCells[i].time, sortedCells[i+1].time)){
                        isSequence = false;
                        break;
                    }
                }

                if (isSequence || mode == 'hard') {
                    state.lastUnselectedItem = null;
                    state.mode.extraData = [...selectedCells];
                }
                else {
                    state.isWarningOpen = true;
                    state.lastUnselectedItem = cell;
                }
            }

        },
        selectCell: (state, action: PayloadAction<CellIndeficator>) => {
            const selectedCell = action.payload;
            if (state.mode.type == 'idle') {
                state.mode = {
                    type: 'selection',
                    extraData: [selectedCell]
                };
            }
            else {
                state.mode.extraData.push(selectedCell);
            }
        },
        closeWarning: (state) => {
            state.isWarningOpen = false;
            state.lastUnselectedItem = null;
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

export const { toggleFixed, toggleTranspose, addOrder, selectCell, unselectCell, closeWarning } = timelineSlice.actions;