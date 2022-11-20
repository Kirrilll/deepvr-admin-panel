import { CellIndeficator } from "../../features/timeline/redux/slice";
import TimeHelper from "./TimeHelper";

class CellHelper {
    static isSame(cellOne: CellIndeficator, cellTwo: CellIndeficator): boolean {
        return cellOne.date === cellTwo.date && cellOne.roomId === cellTwo.roomId && cellOne.time === cellTwo.time;
    }

    static isNextOrPrev(cellOne: CellIndeficator, cellTwo: CellIndeficator): boolean{
        return cellOne.date == cellTwo.date && TimeHelper.isNextOrPrev(cellOne.time, cellTwo.time);
    }
}

export default CellHelper;