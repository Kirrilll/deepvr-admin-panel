import { AppDispatch } from "../../../app/store";
import { TimelineMode, TimelineModeType } from "../../../entities/TimelineOptions";
import { CellPivot } from "../../../entities/TimelineTypes";
import { startSelecting } from "../../../features/selection/redux/slice";
import { CellIndeficator } from "../../../features/timeline/redux/slice";
import { DEFAULT_CELL_CLASSNAME } from "../../../features/timeline/ui/Cell";
import CellSelectionModeFactory from "./CellSelectionModeFactory";
export type TimelineModeExtended = Omit<TimelineMode, 'type'> & { type: TimelineModeType | 'overpast' };

class CellModeFactory {
    static createMode(mode: TimelineModeExtended, cellId: CellIndeficator, pivot: CellPivot | null, dispatch: AppDispatch) {
        switch (mode.type) {
            case 'overpast':
                return ({
                    isLastSelected: false,
                    className: `${DEFAULT_CELL_CLASSNAME} unselectable--idle`,
                    onClick: () => { }
                });
            case 'selection':
                return CellSelectionModeFactory.createSelectionMode({
                    selectedCells: mode.extraData as CellIndeficator[],
                    cellId: cellId,
                    dispatch: dispatch,
                    pivot: pivot
                });
            default:
                return ({
                    isLastSelected: false,
                    className: `${DEFAULT_CELL_CLASSNAME}`,
                    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                        e.preventDefault();
                        dispatch(startSelecting(cellId))
                    }
                })
        }
    }
}

export default CellModeFactory;