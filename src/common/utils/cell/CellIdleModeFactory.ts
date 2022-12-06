import { AppDispatch } from "../../../app/store";
import { CellView } from "../../../entities/Cell";
import { startSelecting } from "../../../features/selection/redux/slice";
import  { DEFAULT_CELL_CLASSNAME } from "../../../features/timeline/ui/Cell";

interface FactoryAttrs {
    dispatch: AppDispatch,
    cell: CellView
}

export default class CellIdleModeFactory {
    static createIdleMode(attrs: FactoryAttrs) {
        const { dispatch, cell } = attrs;
        if (cell.pivot == null) {
            return ({
                isLastSelected: false,
                className: `${DEFAULT_CELL_CLASSNAME}`,
                onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                    dispatch(startSelecting(cell))
                }
            })
        }
        else {
            return ({
                isLastSelected: false,
                className: `${DEFAULT_CELL_CLASSNAME}`,
                onClick: () => dispatch(startSelecting(cell))
            })
        }
    }
}