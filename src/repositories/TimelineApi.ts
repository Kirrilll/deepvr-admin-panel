import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GameResponse } from '../entities/Game';
import GameView from '../entities/GameView';
import RoomResponse, { Room } from '../entities/Room'
import { WorkingShiftView } from '../entities/WorkingShift';
import GameMapper from '../mappers/GameMapper';
import TimeMapper from '../mappers/TimeMapper'

const timeMapper = new TimeMapper();
const gameMapper = new GameMapper();

export const timelineApi = createApi({
    reducerPath: 'timelineApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL
    }),
    endpoints: (build) => ({
        getWorkingShift: build.query<WorkingShiftView, void>({
            query: () => ({ url: '/v2/work-times' }),
            transformResponse: timeMapper.transformToModel
        }),
        getRooms: build.query<RoomResponse, void>({
            query: () => ({ url: '/rooms' }),
        }),
        getGames: build.query<GameView[], void>({
            query: () => ({url: '/games'}),
            transformResponse: GameMapper.gamesFromEntities
        })
    })
})

export const { useGetRoomsQuery, useGetWorkingShiftQuery, useGetGamesQuery } = timelineApi;