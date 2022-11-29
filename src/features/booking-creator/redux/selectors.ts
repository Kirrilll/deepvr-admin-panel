import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import OrderMapper from "../../../common/mappers/OrderMapper";

export const selectInitialValues = (state: RootState) => OrderMapper.fromCreationToForm(state.modalReducer.initialData);
export const selectIsCreating = (state: RootState) => state.modalReducer.isOpen;