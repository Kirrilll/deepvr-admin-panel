import { AppDispatch } from "../../../app/store";
import { CellView, CellPivot } from "../../../entities/Cell";
import { TimelineMode, TimelineModeType } from "../../../entities/TimelineOptions";

import { startSelecting } from "../../../features/selection/redux/slice";
import { CellIndeficator } from "../../../features/timeline/redux/slice";
import { DEFAULT_CELL_CLASSNAME } from "../../../features/timeline/ui/Cell";
import CellIdleModeFactory from "./CellIdleModeFactory";
import CellSelectionModeFactory from "./CellSelectionModeFactory";
export type TimelineModeExtended = Omit<TimelineMode, 'type'> & { type: TimelineModeType | 'overpast' };

class CellModeFactory {
    static createMode(mode: TimelineModeExtended, cell: CellView, dispatch: AppDispatch) {
        switch (mode.type) {
            case 'overpast':
                return ({
                    isLastSelected: false,
                    className: `${DEFAULT_CELL_CLASSNAME} unselectable--idle`,
                    onClick: () => { }
                });
            case 'selection':
                return CellSelectionModeFactory.createSelectionMode({
                    selectedCells: mode.extraData as CellView[],
                    cell: cell,
                    dispatch: dispatch,
                });
            default:
                return CellIdleModeFactory.createIdleMode({
                    dispatch: dispatch,
                    cell: cell
                })
        }
    }
}

export default CellModeFactory;