import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { valueType } from "antd/lib/statistic/utils";
import { AppDispatch, RootState } from "../../app/store";
import { selectCells } from "../../features/selection/redux/selectors";
import { selectCell, startSelecting, unselectCell } from "../../features/selection/redux/slice";
import { CellIndeficator } from "../../features/timeline/redux/slice";
import { addWarning } from "../../features/warning-modal/redux/slice";
import CellHelper from "../helpers/CellHelper";

interface WarningRule<T> {
    actions: AnyAction[],
    isWarningRule: (value: T) => boolean,
    warningMessage: string,
}

const selectionRule: WarningRule<CellIndeficator[]> = {
    actions: [startSelecting, selectCell],
    isWarningRule: (selectedCells: CellIndeficator[]) => !CellHelper.isSequence(selectedCells),
    warningMessage: 'Может образоваться временная яма'
}

const unselectRule: WarningRule<CellIndeficator[]> = {
    actions: [unselectCell],
    isWarningRule: (selectedCells: CellIndeficator[]) => !CellHelper.isSequence(selectedCells),
    warningMessage: 'Может образоваться временная яма'
}

const selectWithDiffDateRule: WarningRule<CellIndeficator[]> = {
    actions: [selectCell],
    isWarningRule: (selectedCells: CellIndeficator[]) => {
        const baseCellDate = selectedCells[0].date;
        const lastCellDate = selectedCells[selectedCells.length - 1].date;
        return baseCellDate != lastCellDate;
    },
    warningMessage: `Вы уверены что хотите создать бронь на эту дату.
     Брони на предыдущую дату будут стерты `
}

const warningMiddleware: Middleware = (storeApi: MiddlewareAPI<AppDispatch>) => (next: AppDispatch) => (action: AnyAction) => {
    const dispatch = storeApi.dispatch;
    const state: RootState = storeApi.getState();
    if (state.warningReducer.isWarning) {
        return next(action);
    }
    if(~selectWithDiffDateRule.actions.findIndex(act => act.type === action.type)){
        const selectedItem = action.payload as CellIndeficator;
        const selectedCells = selectCells(state);
        const newSelectedCells = [...selectedCells, selectedItem];
        if(selectWithDiffDateRule.isWarningRule(newSelectedCells)){
            return dispatch(addWarning({
                message: selectWithDiffDateRule.warningMessage,
                interruptedAction: {
                    type: startSelecting.type,
                    payload: selectedItem
                }
            }))
        }
    }
    if (~selectionRule.actions.findIndex(act => act.type == action.type)) {
        const selectedItem = action.payload as CellIndeficator;
        const selectedCells = selectCells(state);
        const newSelectedCells = [...selectedCells, selectedItem];
        if (selectionRule.isWarningRule(newSelectedCells)) {
            return dispatch(addWarning({
                message: selectionRule.warningMessage,
                interruptedAction: {
                    type: action.type,
                    payload: action.payload
                }
            }));
        }
    }
    if (~unselectRule.actions.findIndex(act => act.type === action.type)) {
        const selectedItem = action.payload as CellIndeficator;
        const selectedCells = selectCells(state);
        const newSelectedCells = selectedCells.filter(cell => !CellHelper.isSame(selectedItem, cell));
        if (unselectRule.isWarningRule(newSelectedCells)) {
            return dispatch(addWarning({
                message: unselectRule.warningMessage,
                interruptedAction: {
                    type: action.type,
                    payload: action.payload
                }
            }));
        }
    }
    return next(action);
}

export default warningMiddleware;