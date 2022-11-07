import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderView } from "../../components/BookingCreateModal";
import api from "../../repositories/Api";


interface CreateBookingArgs{
    order: OrderView,
    token: string
}

export const fetchBookings = createAsyncThunk(
    'fetchTimeline',
    async (date: moment.Moment) => {
        const response = await api.getTimeline(date);
        return response.data;
    }
)

export const createBooking = createAsyncThunk(
    'createBooking',
    async (args: CreateBookingArgs) => {
        const {order, token}= args;
        const response = await api.createBooking(order, token);
        return response.data;
    }
)