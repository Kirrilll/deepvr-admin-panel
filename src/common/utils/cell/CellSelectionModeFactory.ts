import { AppDispatch } from "../../../app/store";
import { CellPivot } from "../../../entities/TimelineTypes";
import { selectCell, unselectCellSafety, } from "../../../features/selection/redux/slice";
import { CellIndeficator } from "../../../features/timeline/redux/slice";
import { DEFAULT_CELL_CLASSNAME } from "../../../features/timeline/ui/Cell";
import CellHelper from "../../helpers/CellHelper";

interface CreateSelectionModeAttrs {
    selectedCells: CellIndeficator[],
    cellId: CellIndeficator,
    dispatch: AppDispatch,
    pivot: CellPivot | null
}


const timeRule = (selectedCells: CellIndeficator[], cellId: CellIndeficator) => selectedCells
    .map(selectedCellId => CellHelper.isNextOrPrev(cellId, selectedCellId))
    .reduce((prev, next) => prev || next);

const pivotRule = (pivot: CellPivot | null) => pivot === null;

class CellSelectionModeFactory {
    static createSelectionMode(attrs: CreateSelectionModeAttrs) {
        const {selectedCells, cellId, dispatch, pivot} = attrs;
        if (~selectedCells.findIndex(selectedCellid => CellHelper.isSame(selectedCellid, cellId))) {
            return ({
                isLastSelected: CellHelper.isSame(selectedCells[selectedCells.length-1], cellId),
                className: DEFAULT_CELL_CLASSNAME + ' selected',
                onClick: () => dispatch(unselectCellSafety(cellId))
            })
        }
        if (timeRule(selectedCells, cellId) && pivotRule(pivot)) {
            return ({
                isLastSelected: false,
                className: DEFAULT_CELL_CLASSNAME + ' selectable',
                onClick: () => dispatch(selectCell(cellId))
            })
        }
        return ({
            isLastSelected: false,
            className: DEFAULT_CELL_CLASSNAME,
            onClick: () => { }
        })
    }
}


export default CellSelectionModeFactory;
