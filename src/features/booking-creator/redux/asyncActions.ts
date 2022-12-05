import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../app/store";
import { OrderDTO } from "../../../entities/OrderDTO";
import { addOrder, CellIndeficator } from "../../timeline/redux/slice";
import api from "../../../repositories/Api";
import { creatingFulfilled, creatingPending, creatingRejected } from "./slice";
import OrderMapper from "../../../common/mappers/OrderMapper";
import { Order } from "../../../entities/Order";
import { resetSelection } from "../../selection/redux/slice";


interface CreateBookingArgs {
    order: OrderDTO,
}

export interface ErrorResponse {
    error: number,
    error_text: string
}



export const createOrder = (order: OrderDTO) => (dispatch: AppDispatch) => {
    dispatch(creatingPending());
    api.createOrder(order)
        .then(
            res => {
                const data = res.data;
                if((data as ErrorResponse).error){
                    console.log((data as ErrorResponse).error_text)
                }
                // if(res.status === 200){
                dispatch(creatingFulfilled());
                dispatch(addOrder(res.data as Order))
                dispatch(resetSelection());
                //}
            }
        )
        .catch(er => dispatch(creatingRejected()))
}

export const precreateOrder = createAsyncThunk(
    'precreateOrder',
    async (selectedCells: CellIndeficator[]) => {
        const res = await api.precreateOrder();
        return OrderMapper.fromCells(selectedCells, res.data.id);
    }
)