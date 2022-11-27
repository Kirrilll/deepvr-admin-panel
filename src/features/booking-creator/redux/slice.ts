import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrderResponse } from "../../../entities/Order"
import OrderCreation from "../../../entities/OrderCreation"
import OrderView from "../../../entities/OrderView"
import { FetchingStatus } from "../../timeline/redux/slice"
import {createBooking, fetchBookings } from "./asyncActions"

interface ModalState{
    isOpen: boolean,
    initialData: OrderCreation | null,
    bookingsFetchingStatus: FetchingStatus,
    createBookingStatus: FetchingStatus,
    message?: string,
    bookings: OrderResponse
}


const initialState: ModalState = {
    isOpen: false,
    initialData: null,
    createBookingStatus: FetchingStatus.NEVER,
    bookingsFetchingStatus: FetchingStatus.NEVER,
    bookings: []
}

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: initialState,
    reducers: {
        open: (state, action: PayloadAction<OrderCreation>) => {
            state.isOpen = true;
            state.initialData = action.payload;

        },
        close: (state) => {
            state.isOpen = false;
            state.initialData = null;
            state.createBookingStatus = FetchingStatus.NEVER;
            state.bookingsFetchingStatus = FetchingStatus.NEVER;
        },
        creatingPending: (state) => {
            state.createBookingStatus = FetchingStatus.LOADING;
        },
        creatingFulfilled: (state) => {
            state.createBookingStatus = FetchingStatus.SUCCESSFULL;
        },
        creatingRejected: (state) => {
            state.createBookingStatus = FetchingStatus.ERROR; 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBookings.pending, (state) => {
            state.bookingsFetchingStatus = FetchingStatus.LOADING;
        }),
        builder.addCase(fetchBookings.fulfilled, (state, action:PayloadAction<OrderResponse>) => {
            state.bookings = action.payload;
            state.bookingsFetchingStatus = FetchingStatus.SUCCESSFULL;
        })
        // builder.addCase(createBooking.pending, (state) => {
        //     state.createBookingStatus = FetchingStatus.LOADING;
        // }),
        // builder.addCase(createBooking.fulfilled, (state) => {
        //     state.createBookingStatus = FetchingStatus.SUCCESSFULL;
        // }),
        // builder.addCase(createBooking.rejected, (state, action) => {
        //     console.log(action.error);
        // })
    }
})

export default modalSlice.reducer;
export const {open, close, creatingPending, creatingFulfilled, creatingRejected } = modalSlice.actions;