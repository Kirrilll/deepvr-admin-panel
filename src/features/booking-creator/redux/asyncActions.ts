import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../app/store";
import { OrderDTO } from "../../../entities/OrderDTO";
import { addOrder } from "../../timeline/redux/slice";
import api from "../../../repositories/Api";
import { creatingFulfilled, creatingPending, creatingRejected } from "./slice";


interface CreateBookingArgs {
    order: OrderDTO,
}


interface DefaultErrorMessage{
    error: number,
    error_text: string
}

export const fetchBookings = createAsyncThunk(
    'fetchTimeline',
    async (date: moment.Moment) => {
        const response = await api.getTimeline(date);
        return response.data;
    }
)


export const createBooking = (order: OrderDTO) => (dispatch: AppDispatch) => {
    dispatch(creatingPending());
    api.createBooking(order)
        .then(
            res => {
                // if(res.status === 200){
                dispatch(creatingFulfilled());
                dispatch(addOrder(res.data))
                //}
            }
        )
        .catch(er => dispatch(creatingRejected()))
}

// export const createBooking = createAsyncThunk(
//     'createBooking',
//     async (args: CreateBookingArgs) => {
//         const { order } = args;
//         const response = await api.createBooking(order);
//         return response.data;
//     }
// )