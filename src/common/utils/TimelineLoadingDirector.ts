import OrderView from "../../entities/OrderView";
import { Room } from "../../entities/Room";
import { Timeline } from "../../entities/TimelineTypes";
import { TimelineDirector } from "../../entities/TimelineUtilsTypes";
import TimelineLoadingBuilder from "./TimelineLoadingBuilder";

class TimelineLoadingDirector implements TimelineDirector{

    private builder: TimelineLoadingBuilder = new TimelineLoadingBuilder();
    public static instance = new TimelineLoadingDirector();

    private constructor(){}

    construct (workingShift: string[], rooms: Room[], data: OrderView[], glasses: number): Timeline{
        return ({
            columns: this.builder.buildColumns(),
            data: this.builder.buildData(),
            summary: this.builder.buildSummary()
        })
    };
    
}

export default TimelineLoadingDirector;