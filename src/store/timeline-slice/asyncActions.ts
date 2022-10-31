import { createAsyncThunk } from "@reduxjs/toolkit";
import timelineService from "../../services/timelineService";


export const fetchTimline = createAsyncThunk(
    'fetchTimeline',
    async (date: moment.Moment) => {
        const response = await timelineService.getTimeline(date);
        return response.data;
    }
)

export const getRooms = createAsyncThunk(
    'getRooms',
    async () => {
        const response = await timelineService.getRooms();
        return response.data;
    }
)