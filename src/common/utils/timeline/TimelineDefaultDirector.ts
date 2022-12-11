import { OrderView } from "../../../entities/Order";
import {Room} from "../../../entities/Room";
import { TimelineOptions } from "../../../entities/TimelineOptions";
import { OrderCellMatrix, Timeline } from "../../../entities/TimelineTypes";
import { TimelineDirector } from "../../../entities/TimelineUtilsTypes";
import TimelineMapper from "../../mappers/TimelineMapper";
import TimelineDefaultBuilder from "./TimelineDefaultBuilder";

class TimelineDefaultDirector implements TimelineDirector {

    private builder = new TimelineDefaultBuilder();
    
    public static instance = new TimelineDefaultDirector();

    private constructor() { };

    construct(workingShift: string[], rooms: Room[], matrix: OrderCellMatrix, glasses: number): Timeline {
        return ({
            columns: this.builder.buildColumns(workingShift),
            data: this.builder.buildData(matrix, rooms),
            summary: this.builder.buildSummary(glasses, workingShift)
        })
    }
}

export default TimelineDefaultDirector;