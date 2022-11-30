import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import OrderMapper from "../../../common/mappers/OrderMapper";
import { FetchingStatus } from "../../timeline/redux/slice";

export const selectInitialValues = (state: RootState) => OrderMapper.fromCreationToForm(state.orderCreationReducer.initialData);
export const selectIsOpen = (state: RootState) => state.orderCreationReducer.isOpen;

export const selectIsCreated = (state: RootState) => state.orderCreationReducer.creationOrderStatus == FetchingStatus.SUCCESSFULL;