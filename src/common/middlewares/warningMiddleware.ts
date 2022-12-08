import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { valueType } from "antd/lib/statistic/utils";
import { AppDispatch, RootState } from "../../app/store";
import { CellView } from "../../entities/Cell";
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

const selectionRule: WarningRule<CellView[]> = {
    actions: [startSelecting, selectCell],
    isWarningRule: (selectedCells: CellView[]) => !CellHelper.isSequence(selectedCells.map(cell => cell.id)),
    warningMessage: 'Может образоваться временная яма'
}

const unselectRule: WarningRule<CellView[]> = {
    actions: [unselectCell],
    isWarningRule: (selectedCells: CellView[]) => !CellHelper.isSequence(selectedCells.map(cell => cell.id)),
    warningMessage: 'Может образоваться временная яма'
}

const selectWithDiffDateRule: WarningRule<CellView[]> = {
    actions: [selectCell],
    isWarningRule: (selectedCells: CellView[]) => {
        const baseCellDate = selectedCells[0].id.date;
        const lastCellDate = selectedCells[selectedCells.length - 1].id.date;
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
        const selectedItem = action.payload as CellView;
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
        const selectedItem = action.payload as CellView;
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
        const selectedItem = action.payload as CellView;
        const selectedCells = selectCells(state);
        const newSelectedCells = selectedCells.filter(cell => !CellHelper.isSame(selectedItem.id, cell.id));
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