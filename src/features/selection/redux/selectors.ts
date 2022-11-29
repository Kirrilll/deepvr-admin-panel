import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { TimelineMode, TimelineModeType } from "../../../entities/TimelineOptions";

export const selectMode = (state: RootState): TimelineModeType => state.selectionReducer.isSelection ? 'selection' : 'idle';
export const selectCells = (state: RootState) => state.selectionReducer.selectedCells;

export const cellsSelector = createDraftSafeSelector(
    [selectCells],
    (selectedCells) => selectedCells
);



