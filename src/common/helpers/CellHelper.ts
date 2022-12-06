
import { CellPivot } from "../../entities/Cell";
import { CellIndeficator } from "../../features/timeline/redux/slice";
import OrderHelper from "./OrderHelper";
import TimeHelper from "./TimeHelper";

class CellHelper {

    static isCellsPivotsEquals(cellPivotOne: CellPivot | null, cellPivotSecond: CellPivot | null): boolean{
        if(cellPivotOne ==  null && cellPivotSecond == null) return true;
        if(cellPivotOne?.order.id != cellPivotSecond?.order.id) return false;
        if(!OrderHelper.isOrdersSame(cellPivotOne!.order, cellPivotSecond!.order)) return false;
        if(cellPivotOne?.bookingIndex != cellPivotSecond?.bookingIndex) return false;
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
}



export default CellHelper;