import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import BookingResponse from "../../entities/Booking"
import BookingView from "../../entities/BookingView"
import { FetchingStatus } from "../timeline-slice/slice"
import { createBooking, fetchBookings } from "./asyncActions"

interface ModalState{
    isOpen: boolean,
    initialData: BookingView | null,
    initialDate: moment.Moment | null,
    initialTime: string | null,
    initialRoomId: number | null,
    bookingsFetchingStatus: FetchingStatus,
    createBookingStatus: FetchingStatus,
    bookings: BookingResponse 
}

interface OpenArgs{
    initialData: BookingView | null,
    initialDate: moment.Moment | null,
    initialTime: string | null,
    initialRoomId: number | null, 
}

const initialState: ModalState = {
    isOpen: false,
    initialData: null,
    initialDate: null,
    initialTime: null,
    initialRoomId: null,
    createBookingStatus: FetchingStatus.NEVER,
    bookingsFetchingStatus: FetchingStatus.NEVER,
    bookings: []
}

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: initialState,
    reducers: {
        open: (state, action: PayloadAction<OpenArgs>) => {
            state.isOpen = true;
            state.initialData = action.payload.initialData;
            state.initialRoomId = action.payload.initialRoomId;
            state.initialTime = action.payload.initialTime;
            state.initialDate = action.payload.initialDate;
        },
        close: (state) => {
            state.isOpen = false;
            state.initialData = null;
            state.createBookingStatus = FetchingStatus.NEVER;
            state.bookingsFetchingStatus = FetchingStatus.NEVER;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBookings.pending, (state) => {
            state.bookingsFetchingStatus = FetchingStatus.LOADING;
        }),
        builder.addCase(fetchBookings.fulfilled, (state, action:PayloadAction<BookingResponse>) => {
            state.bookings = action.payload;
            state.bookingsFetchingStatus = FetchingStatus.SUCCESSFULL;
        }),
        builder.addCase(createBooking.pending, (state) => {
            state.createBookingStatus = FetchingStatus.LOADING;
        }),
        builder.addCase(createBooking.fulfilled, (state) => {
            state.createBookingStatus = FetchingStatus.SUCCESSFULL;
        })
    }
})

export default modalSlice.reducer;
export const {open, close } = modalSlice.actions;