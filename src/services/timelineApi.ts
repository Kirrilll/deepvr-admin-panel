import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RoomResponse } from '../entities/RoomResponse'
 

console.log(process.env.REACT_APP_API_URL)

export const timelineApi = createApi({
    reducerPath: 'timelineApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL
    }),
    endpoints: (build) => ({
        getWorkingShift: build.query<string[], null>({
            query: () => ({url: '/'})
        }),
        getRooms: build.query<RoomResponse[], null>({
            query: () => ({url: '/rooms'})
        })
    })
})

export const {useGetRoomsQuery, useGetWorkingShiftQuery} = timelineApi;