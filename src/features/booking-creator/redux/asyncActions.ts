import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../app/store";
import { insertOrder, CellIndeficator } from "../../timeline/redux/slice";
import api from "../../../repositories/Api";
import { creatingFulfilled, creatingPending, creatingRejected } from "./slice";
import OrderMapper from "../../../common/mappers/OrderMapper";
import { Order, OrderDto } from "../../../entities/Order";
import { resetSelection } from "../../selection/redux/slice";


export interface ErrorResponse {
    error: number,
    error_text: string
}



export const createOrder = (order: OrderDto) => (dispatch: AppDispatch) => {
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
                dispatch(insertOrder(res.data as Order))
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