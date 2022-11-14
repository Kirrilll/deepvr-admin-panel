
import OrderView from "../../../entities/OrderView";
import {Room} from "../../../entities/Room";
import { Timeline } from "../../../entities/TimelineTypes";
import { TimelineDirector } from "../../../entities/TimelineUtilsTypes";
import TimelineMapper from "../../mappers/TimelineMapper";
import TimelineDefaultBuilder from "./TimelineDefaultBuilder";

class TimelineDefaultDirector implements TimelineDirector {

    private builder = new TimelineDefaultBuilder();
    
    public static instance = new TimelineDefaultDirector();

    private constructor() { };

    construct(workingShift: string[], rooms: Room[], data: OrderView[], glasses: number): Timeline {
        const dataMatrix = TimelineMapper.toOrderMatrixDefault(data, workingShift, rooms);
        return ({
            columns: this.builder.buildColumns(workingShift),
            data: this.builder.buildData(dataMatrix, rooms),
            summary: this.builder.buildSummary(glasses, workingShift)
        })
    }
}

export default TimelineDefaultDirector;