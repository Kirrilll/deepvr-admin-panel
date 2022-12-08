import {  createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import GameMapper from "../../../common/mappers/GameMapper";
import WorkingParamsMapper from "../../../common/mappers/WorkingParamsMapper";
import { FetchingStatus } from "../../timeline/redux/slice";


export const selectGames = (state: RootState) => GameMapper.gamesFromEntities(state.jobDataReducer.games);
export const buildGamesByRoomSelector = (roomId: number) => createSelector(
    [selectGames],
    (games) => games.filter(game => ~game.rooms.findIndex(room => room.id === roomId))
);

export const selectRooms = (state: RootState) => state.jobDataReducer.rooms;
export const selectWorkingParams = (state: RootState) => WorkingParamsMapper.toModel(state.jobDataReducer.workingParams);
export const isTimelineReadySelector = createSelector(
    [
        (state: RootState) => state.jobDataReducer.gamesStatus === FetchingStatus.SUCCESSFULL,
        (state: RootState) => state.jobDataReducer.roomsStatus === FetchingStatus.SUCCESSFULL,
        (state: RootState) => state.jobDataReducer.workingParamsStatus === FetchingStatus.SUCCESSFULL
    ],
    (isGames, isRooms, isWorkingParams) => isGames && isRooms && isWorkingParams
);


export const buildRoomByIdSelector = (id: number) => createSelector(
    [(state: RootState) => state.jobDataReducer.rooms.filter(room => room.id === id).at(0)],
    (room) => room
);