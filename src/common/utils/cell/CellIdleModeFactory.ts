import { AppDispatch } from "../../../app/store";
import { CellPivot } from "../../../entities/TimelineTypes";
import { startSelecting } from "../../../features/selection/redux/slice";
import { CellIndeficator } from "../../../features/timeline/redux/slice";
import { DEFAULT_CELL_CLASSNAME } from "../../../features/timeline/ui/Cell";

interface FactoryAttrs {
    dispatch: AppDispatch,
    pivot: CellPivot | null,
    cellId: CellIndeficator
}

export default class CellIdleModeFactory {
    static createIdleMode(attrs: FactoryAttrs) {
        const { dispatch, pivot, cellId } = attrs;
        if (pivot == null) {
            return ({
                isLastSelected: false,
                className: `${DEFAULT_CELL_CLASSNAME}`,
                onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                    dispatch(startSelecting(cellId))
                }
            })
        }
        else {
            return ({
                isLastSelected: false,
                className: `${DEFAULT_CELL_CLASSNAME}`,
                onClick: ()=> {}
            })
        }
    }
}