import OrderView from "../../../entities/OrderView";
import {Room} from "../../../entities/Room";
import { Timeline } from "../../../entities/TimelineTypes";
import { TimelineDirector } from "../../../entities/TimelineUtilsTypes";
import TimelineMapper from "../../mappers/TimelineMapper";
import TimelineTransposedBuilder from "./TimelineTransposedBuilder";

class TimelineTransposedDirector implements TimelineDirector {

    private builder = new TimelineTransposedBuilder();
    public static instance = new TimelineTransposedDirector();

    private constructor(){};

    construct(workingShift: string[], rooms: Room[], data: OrderView[], glasses: number): Timeline{
        const dataMatrix = TimelineMapper.toOrderMatrixTransposed(data, workingShift, rooms);
        return ({
            columns: this.builder.buildColumns(rooms),
            data: this.builder.buildData(dataMatrix, workingShift, glasses),
            summary: this.builder.buildSummary()
        })
    }
}

export default TimelineTransposedDirector;