import { AnyAction, createAction, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import CellHelper from "../../../common/helpers/CellHelper";
import TimeHelper from "../../../common/helpers/TimeHelper";
import StorageService from "../../../common/services/StorageService";
import { CellIndeficator } from "../../timeline/redux/slice";

export interface SelectionState {
    isSelection: boolean,
    selectedCells: CellIndeficator[],
    isWarning: boolean
}

const initilaState: SelectionState = {
    isSelection: false,
    selectedCells: [],
    isWarning: false
}

export const startSelecting = createAction<CellIndeficator>('startSelecting');
export const endSelecting = createAction('endSelectiong');
export const selectCell = createAction<CellIndeficator>('selectCell');
export const unselectCellSafety = createAction<CellIndeficator>('unselectCellSafety');
export const unselectCell = createAction<CellIndeficator>('unselectCell');
export const closeWarning = createAction('closeWarning');


const getFiltredCells = (selectedCells: CellIndeficator[], unselectedCell: CellIndeficator) => {
    return selectedCells.filter(cell => !CellHelper.isSame(cell, unselectedCell));
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
            .addCase(closeWarning, (state) => {
                state.isWarning = false;
            })
            .addCase(unselectCellSafety, (state, action) => {
                const cells = getFiltredCells(state.selectedCells, action.payload);
                if(!CellHelper.isSequence(cells)){
                    state.isWarning = true;
                }
                else{
                    state.selectedCells = cells;
                }
            })
            .addCase(unselectCell, (state, action) => {
                state.selectedCells = getFiltredCells(state.selectedCells, action.payload);
            })
            .addMatcher(
                isAnyOf(unselectCell, unselectCellSafety), 
                (state) => {
                    if(state.selectedCells.length === 0){
                        state.isSelection = false;
                    }
                }
            )
            .addMatcher(
                isAnyOf(selectCell, startSelecting, unselectCellSafety),
                (state, action) => {
                    StorageService.instance.setItem('lastSelectedItem', action.payload);
                }
            )

    },

})

export default selectionSlice.reducer;