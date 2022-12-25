import { createAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import CellHelper from "../../../common/helpers/CellHelper";
import StorageService from "../../../common/services/StorageService";
import { CellView } from "../../../entities/Cell";
import { CellIndeficator } from "../../timeline/redux/slice";

export interface SelectionState {
    isSelection: boolean,
    selectedCells: CellView[],
}

const initilaState: SelectionState = {
    isSelection: false,
    selectedCells: [],
}

export const startSelecting = createAction<CellView>('startSelecting');
export const multiSelectCells = createAction<CellView[]>('multiSelect')
export const endSelecting = createAction('endSelectiong');
export const selectCell = createAction<CellView>('selectCell');
export const unselectCell = createAction<CellView>('unselectCellSafety');
export const closeWarning = createAction('closeWarning');
export const resetSelection = createAction('resetSelection');

const getFiltredCells = (selectedCells: CellView[], unselectedCell: CellView) => {
    return selectedCells.filter(cell => !CellHelper.isSame(cell.id, unselectedCell.id));
}

const selectionSlice = createSlice({
    name: 'selectionSlice',
    initialState: initilaState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(selectCell, (state, action) => {
                state.selectedCells.push(action.payload);
            })
            .addCase(startSelecting, (state, action) => {
                state.isSelection = true;
                state.selectedCells = [action.payload];
            })
            .addCase(unselectCell, (state, action) => {
                const cells = getFiltredCells(state.selectedCells, action.payload);
                state.selectedCells = cells;
            })
            .addCase(resetSelection, state => {
                state.isSelection = false;
                state.selectedCells = [];
            })
            .addCase(multiSelectCells, (state, action) => {
                state.isSelection = true;
                state.selectedCells = [...action.payload];
            })
            .addMatcher(
                isAnyOf(unselectCell),
                (state) => {
                    if (state.selectedCells.length === 0) {
                        state.isSelection = false;
                    }
                }
            )
            .addMatcher(
                isAnyOf(selectCell, startSelecting, unselectCell),
                (state, action) => {
                    StorageService.instance.setItem('lastSelectedItem', action.payload);
                }
            )

    },

})

export default selectionSlice.reducer;