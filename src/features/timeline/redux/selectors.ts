import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { TimelineType } from "../../../entities/TimelineTypes"
import { CellIndeficator } from "./slice";

export const selectType = (state: RootState) => state.timeLineReducer.type;
export const selectOptions = (state: RootState) => state.timeLineReducer.options;
export const selectSelectedCells = (state: RootState) => (state.timeLineReducer.mode.extraData ?? []) as CellIndeficator[];

