
import { OrderView } from "../../../entities/Order";
import {Room} from "../../../entities/Room";
import { OrderCellMatrix, TimelineView, TransposedTimeline } from "../../../entities/TimelineTypes";
import { TimelineDirector } from "../../../entities/TimelineUtilsTypes";
import TimelineMapper from "../../mappers/TimelineMapper";
import TimelineTransposedBuilder from "./TimelineTransposedBuilder";

class TimelineTransposedDirector implements TimelineDirector {

    private builder = new TimelineTransposedBuilder();
    public static instance = new TimelineTransposedDirector();

    private constructor(){};

    construct(timeline: TransposedTimeline): TimelineView{
        return ({
            columns: this.builder.buildColumns(timeline.header),
            data: this.builder.buildData(timeline.matrix, timeline.presentCol, 60),
            summary: this.builder.buildSummary()
        })
    }
}

export default TimelineTransposedDirector;