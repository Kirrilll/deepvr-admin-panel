import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import RoomResponse, { Room } from '../entities/Room'
import { WorkingShiftView } from '../entities/WorkingShift';
import TimeMapper from '../TimeMapper'

const timeMapper = new TimeMapper();

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
        })
    })
})

export const { useGetRoomsQuery, useGetWorkingShiftQuery } = timelineApi;