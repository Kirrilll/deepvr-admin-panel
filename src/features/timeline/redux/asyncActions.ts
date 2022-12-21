import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/Api";


export const fetchTimline = createAsyncThunk(
    'fetchBookings',
    async (date: moment.Moment) => {
        
        const response = await api.getTimeline(date);
        return response.data;
    }
)
