import { Room } from "../../entities/Room";
import { BookingMatrix, Timeline } from "../../entities/TimelineTypes";
import { TimelineDirector } from "../../entities/TimelineUtilsTypes";
import TimelineDefaultBuilder from "./TimelineDefaultBuilder";

class TimelineDefaultDirector implements TimelineDirector {

    private builder = new TimelineDefaultBuilder();

    public static instance = new TimelineDefaultDirector();

    private constructor() { };

    construct(workingShift: string[], rooms: Room[], data: BookingMatrix, glasses: number): Timeline {
        return ({
            columns: this.builder.buildColumns(workingShift),
            data: this.builder.buildData(data, rooms),
            summary: this.builder.buildSummary(glasses, workingShift)
        })
    }
}

export default TimelineDefaultDirector;