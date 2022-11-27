import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import OrderMapper from "../../../common/mappers/OrderMapper";

export const selectComplexOrder = createDraftSafeSelector([
    (state: RootState) => state.modalReducer.initialData,
    (state: RootState) => state.selectionReducer.selectedCells
],
    (initialData, selectedCells) => {
        if (selectedCells.length == 0) {
            return initialData;
        }
        const order = OrderMapper.fromCells(selectedCells);
        if (initialData == null) {
            return order
        }
        return ({
            ...initialData,
            bookings: [...initialData.bookings, ...order.bookings]
        })
    }
);