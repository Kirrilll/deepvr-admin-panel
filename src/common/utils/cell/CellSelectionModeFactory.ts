import { AppDispatch } from "../../../app/store";
import { CellView, CellPivot } from "../../../entities/Cell";
import { selectCell, unselectCell, } from "../../../features/selection/redux/slice";
import { CellIndeficator } from "../../../features/timeline/redux/slice";
import { DEFAULT_CELL_CLASSNAME } from "../../../features/timeline/ui/Cell";
import CellHelper from "../../helpers/CellHelper";

interface CreateSelectionModeAttrs {
    selectedCells: CellView[],
    cell: CellView,
    dispatch: AppDispatch,
}


const timeRule = (selectedCells: CellView[], cellId: CellIndeficator) => selectedCells
    .map(cell => cell.id)
    .map(selectedCellId => CellHelper.isNextOrPrev(cellId, selectedCellId))
    .reduce((prev, next) => prev || next);

const pivotRule = (pivot: CellPivot | null) => pivot === null;

class CellSelectionModeFactory {
    static createSelectionMode(attrs: CreateSelectionModeAttrs) {
        const { selectedCells, cell, dispatch } = attrs;
        if (~selectedCells.findIndex(selectedCell => CellHelper.isSame(selectedCell.id, cell.id))) {
            return ({
                isLastSelected: CellHelper.isSame(selectedCells[selectedCells.length - 1].id, cell.id),
                className: DEFAULT_CELL_CLASSNAME + ' selected',
                onClick: () => dispatch(unselectCell(cell))
            })
        }
        if (timeRule(selectedCells, cell.id) && pivotRule(cell.pivot)) {
            return ({
                isLastSelected: false,
                className: DEFAULT_CELL_CLASSNAME + ' selectable',
                onClick: () => dispatch(selectCell(cell))
            })
        }
        if (!pivotRule(cell.pivot)) {
            return ({
                isLastSelected: false,
                className: DEFAULT_CELL_CLASSNAME,
                onClick: () => {}
            })
        }
        return ({
            isLastSelected: false,
            className: DEFAULT_CELL_CLASSNAME,
            onClick: () => dispatch(selectCell(cell))
        })
    }
}


export default CellSelectionModeFactory;
