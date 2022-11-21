import { CellIndeficator } from "../../features/timeline/redux/slice";
import TimeHelper from "./TimeHelper";

class CellHelper {
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