
import { OrderView } from "../../../entities/Order";
import {Room} from "../../../entities/Room";
import { OrderCellMatrix, Timeline } from "../../../entities/TimelineTypes";
import { TimelineDirector } from "../../../entities/TimelineUtilsTypes";
import TimelineMapper from "../../mappers/TimelineMapper";
import TimelineTransposedBuilder from "./TimelineTransposedBuilder";

class TimelineTransposedDirector implements TimelineDirector {

    private builder = new TimelineTransposedBuilder();
    public static instance = new TimelineTransposedDirector();

    private constructor(){};

    construct(workingShift: string[], rooms: Room[], matrix: OrderCellMatrix, glasses: number): Timeline{
        return ({
            columns: this.builder.buildColumns(rooms),
            data: this.builder.buildData(matrix, workingShift, glasses),
            summary: this.builder.buildSummary()
        })
    }
}

export default TimelineTransposedDirector;