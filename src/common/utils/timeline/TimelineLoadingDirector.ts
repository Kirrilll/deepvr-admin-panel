
import { OrderView } from "../../../entities/Order";
import {Room} from "../../../entities/Room";
import { TimelineOptions } from "../../../entities/TimelineOptions";
import { OrderCellMatrix, Timeline } from "../../../entities/TimelineTypes";
import { TimelineDirector } from "../../../entities/TimelineUtilsTypes";
import TimelineLoadingBuilder from "./TimelineLoadingBuilder";

class TimelineLoadingDirector implements TimelineDirector{

    private builder: TimelineLoadingBuilder = new TimelineLoadingBuilder();
    public static instance = new TimelineLoadingDirector();

    private constructor(){}

    construct (workingShift: string[], rooms: Room[], matrix: OrderCellMatrix, glasses: number): Timeline{
        return ({
            columns: this.builder.buildColumns(),
            data: this.builder.buildData(),
            summary: this.builder.buildSummary()
        })
    };
    
}

export default TimelineLoadingDirector;