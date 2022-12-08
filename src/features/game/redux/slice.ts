import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameResponse } from "../../../entities/Game";
import RoomResponse from "../../../entities/Room";
import WorkingShiftResponse from "../../../entities/WorkingShift";
import { FetchingStatus } from "../../timeline/redux/slice";
import { getGames, getRooms, getWorkingParams } from "./asyncActions";

interface JobDataState{
    games: GameResponse,
    rooms: RoomResponse,
    workingParams: WorkingShiftResponse | null
    gamesStatus: FetchingStatus,
    roomsStatus: FetchingStatus,
    workingParamsStatus: FetchingStatus
}

const initialState: JobDataState = {
    games: [],
    rooms: [],
    workingParams: null, 
    gamesStatus: FetchingStatus.NEVER,
    roomsStatus: FetchingStatus.NEVER,
    workingParamsStatus: FetchingStatus.NEVER
}

const jobDataSlice = createSlice({
    name: 'jobDataSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGames.pending, (state) => {
            state.gamesStatus = FetchingStatus.LOADING;
        }),
        builder.addCase(getGames.fulfilled, (state, action:PayloadAction<GameResponse>) => {
            state.gamesStatus = FetchingStatus.SUCCESSFULL;
            state.games = action.payload;
        }),
        builder.addCase(getRooms.pending, state => {
            state.roomsStatus = FetchingStatus.LOADING;
        }),
        builder.addCase(getRooms.fulfilled, (state, action: PayloadAction<RoomResponse>) => {
            state.roomsStatus = FetchingStatus.SUCCESSFULL;
            state.rooms = action.payload;
        }),
        builder.addCase(getWorkingParams.pending, state => {
            state.workingParamsStatus = FetchingStatus.LOADING;
        }),
        builder.addCase(getWorkingParams.fulfilled, (state, action: PayloadAction<WorkingShiftResponse>) => {
            state.workingParamsStatus = FetchingStatus.SUCCESSFULL;
            state.workingParams = action.payload;
        })
    }
});

export default jobDataSlice.reducer;