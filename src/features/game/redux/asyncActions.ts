import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../repositories/Api";


export const getGames = createAsyncThunk(
    'getGames',
    async () => {
        const res = await api.getGames();
        return res.data;
    }
)

export const getRooms = createAsyncThunk(
    'getRooms',
    async () => {
        const res = await api.getRooms();
        return res.data;
    }
)

export const getWorkingParams = createAsyncThunk(
    'getWorkingParams',
    async () => {
        const res = await api.getWorkingParams();
        return res.data;
    }
)