import { CellPivot } from "../../entities/TimelineTypes";
import { CellIndeficator } from "../../features/timeline/redux/slice";
import { CellProps } from "../../features/timeline/ui/Cell";
import OrderHelper from "./OrderHelper";
import TimeHelper from "./TimeHelper";

class CellHelper {

    static isCellsPivotsEquals(cellPivotOne: CellPivot | null, cellPivotSecond: CellPivot | null): boolean{
        if(cellPivotOne ==  null && cellPivotSecond == null) return true;
        if(cellPivotOne?.order.id != cellPivotSecond?.order.id) return false;
        if(!OrderHelper.isOrdersSame(cellPivotOne!.order, cellPivotSecond!.order)) return false;
        return true;
    }

    static isPropsEquals(cellPropsOne: Readonly<CellProps>, cellPropsSecond: Readonly<CellProps>): boolean {
        if(cellPropsOne.roomId != cellPropsSecond.roomId) return false;
        if(cellPropsOne.time != cellPropsSecond.time) return false;
        if(!CellHelper.isCellsPivotsEquals(cellPropsOne.pivot, cellPropsSecond.pivot)) return false;
        return true;
    }

    static isSame(cellOne: CellIndeficator, cellTwo: CellIndeficator): boolean {
        return cellOne.date === cellTwo.date && cellOne.roomId === cellTwo.roomId && cellOne.time === cellTwo.time;
    }

    static isNextOrPrev(cellOne: CellIndeficator, cellTwo: CellIndeficator): boolean {
        return cellOne.date == cellTwo.date && TimeHelper.isNextOrPrev(cellOne.time, cellTwo.time);
    }

    static isSequence(cells: CellIndeficator[]): boolean {
        let isSequence = true;
        const sortedCells = cells
            .sort((prev, next) => TimeHelper.getTimeDiff(prev.time, next.time));

        for (let i = 0; i < sortedCells.length; i++) {
            const isLast = i == sortedCells.length - 1;
            if (!isLast && !TimeHelper.isNextOrPrev(sortedCells[i].time, sortedCells[i + 1].time)) {
                isSequence = false;
                break;
            }
        }
        return isSequence;
    }

    static generateId(identificator: CellIndeficator) {
        return Number.parseInt(TimeHelper.getTimeInMinutes(identificator.time) 
        + '' + identificator.roomId 
        + '' + new Date(identificator.date).getMinutes());
    }
}



export default CellHelper;