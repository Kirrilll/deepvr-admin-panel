import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import moment from "moment"
import { useAppSelector } from "../../../app/store"
import OrderMapper from "../../../common/mappers/OrderMapper"
import { OrderCreation, OrderResponse, OrderView } from "../../../entities/Order"
import { EPaymentStatus, EConfirmStatus } from "../../../entities/PaymentInfo"

import { cellsSelector } from "../../selection/redux/selectors"
import { FetchingStatus } from "../../timeline/redux/slice"
import { createOrder, precreateOrder } from "./asyncActions"


interface OrderCreatorState {
    isCreating: boolean,
    initialData: OrderCreation,
    orderStatus: FetchingStatus,
    creationOrderStatus: FetchingStatus,
    message?: string,
}


const initialState: OrderCreatorState = {
    isCreating: false,
    initialData: {
        id: -1,
        date: moment(),
        paymentStatus: EPaymentStatus.NOTPAID,
        confirmStatus: EConfirmStatus.NOTCONFIRM,
        bookings: []
    },
    orderStatus: FetchingStatus.NEVER,
    creationOrderStatus: FetchingStatus.NEVER
}

const orderCreationSlice = createSlice({
    name: 'modalSlice',
    initialState: initialState,
    reducers: {
        editOrder: (state, action: PayloadAction<OrderView>) => {
            state.isCreating = true;
            state.initialData = OrderMapper.fromViewToCreation(action.payload);
        },
        close: (state) => {
            state.isCreating = false;
            state.orderStatus = FetchingStatus.NEVER;
        },
        creatingPending: (state) => {
            state.orderStatus = FetchingStatus.LOADING;
        },
        creatingFulfilled: (state) => {
            state.orderStatus = FetchingStatus.SUCCESSFULL;
            state.isCreating = false;
        },
        creatingRejected: (state) => {
            state.orderStatus = FetchingStatus.ERROR;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(precreateOrder.pending, (state) => {
            state.creationOrderStatus = FetchingStatus.LOADING;
        }),
        builder.addCase(precreateOrder.fulfilled, (state, action: PayloadAction<OrderCreation>) => {
            state.isCreating = true;
            state.creationOrderStatus = FetchingStatus.SUCCESSFULL;
            state.initialData = action.payload;
        })
    }
})

export default orderCreationSlice.reducer;
export const { close, creatingPending, creatingFulfilled, editOrder, creatingRejected } = orderCreationSlice.actions;