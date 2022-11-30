import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import moment from "moment"
import { useAppSelector } from "../../../app/store"
import OrderMapper from "../../../common/mappers/OrderMapper"
import { OrderResponse } from "../../../entities/Order"
import OrderCreation, { PrecreateOrder } from "../../../entities/OrderCreation"
import OrderView, { EConfirmStatus, EPaymentStatus } from "../../../entities/OrderView"
import { cellsSelector } from "../../selection/redux/selectors"
import { FetchingStatus } from "../../timeline/redux/slice"
import { createOrder, precreateOrder } from "./asyncActions"

interface ModalState {
    isOpen: boolean,
    initialData: OrderCreation,
    orderStatus: FetchingStatus,
    creationOrderStatus: FetchingStatus,
    message?: string,
}


const initialState: ModalState = {
    isOpen: false,
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
            state.isOpen = true;
            state.initialData = OrderMapper.fromViewToCreation(action.payload);
        },
        close: (state) => {
            state.isOpen = false;
            state.orderStatus = FetchingStatus.NEVER;
        },
        creatingPending: (state) => {
            state.orderStatus = FetchingStatus.LOADING;
        },
        creatingFulfilled: (state) => {
            state.orderStatus = FetchingStatus.SUCCESSFULL;
        },
        creatingRejected: (state) => {
            state.orderStatus = FetchingStatus.ERROR;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(precreateOrder.pending, (state) => {
            state.isOpen = true;
            state.creationOrderStatus = FetchingStatus.LOADING;
        }),
            builder.addCase(precreateOrder.fulfilled, (state, action: PayloadAction<OrderCreation>) => {
                state.creationOrderStatus = FetchingStatus.SUCCESSFULL;
                state.initialData = action.payload;
            })
    }
})

export default orderCreationSlice.reducer;
export const { close, creatingPending, creatingFulfilled, editOrder, creatingRejected } = orderCreationSlice.actions;