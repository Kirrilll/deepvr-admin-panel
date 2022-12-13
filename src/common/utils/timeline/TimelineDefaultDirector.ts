import { OrderView } from "../../../entities/Order";
import {Room} from "../../../entities/Room";
import { TimelineOptions } from "../../../entities/TimelineOptions";
import { DefaultTimeline, OrderCellMatrix, TimelineView } from "../../../entities/TimelineTypes";
import { RestArgsTypes, TimelineDirector } from "../../../entities/TimelineUtilsTypes";
import TimelineMapper from "../../mappers/TimelineMapper";
import TimelineDefaultBuilder from "./TimelineDefaultBuilder";

class TimelineDefaultDirector implements TimelineDirector {

    private builder = new TimelineDefaultBuilder();
    
    public static instance = new TimelineDefaultDirector();

    private constructor() { };

    construct(timeline: DefaultTimeline): TimelineView {
        return ({
            columns: this.builder.buildColumns(timeline.header),
            data: this.builder.buildData(timeline.matrix, timeline.presentCol),
            summary: this.builder.buildSummary(timeline.remainingGlassesMap)
        })
    }
}

export default TimelineDefaultDirector;