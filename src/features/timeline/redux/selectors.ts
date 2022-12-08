import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { TimelineType } from "../../../entities/TimelineTypes"
import { selectRooms, selectWorkingParams } from "../../game/redux/selectors";
import { CellIndeficator } from "./slice";

export const selectType = (state: RootState) => state.timeLineReducer.type;
export const selectOptions = (state: RootState) => state.timeLineReducer.options;
export const selectOrders = (state: RootState) => state.timeLineReducer.data;
