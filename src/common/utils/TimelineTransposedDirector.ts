import { TableColumnsType } from "antd";
import { ReactNode } from "react";
import { Room } from "../../entities/Room";
import { BookingMatrix, Timeline } from "../../entities/TimelineTypes";
import { TimelineDirector } from "../../entities/TimelineUtilsTypes";
import TimelineTransposedBuilder from "./TimelineTransposedBuilder";

class TimelineTransposedDirector implements TimelineDirector {

    private builder = new TimelineTransposedBuilder();
    public static instance = new TimelineTransposedDirector();

    private constructor(){};

    construct(workingShift: string[], rooms: Room[], data: BookingMatrix, glasses: number): Timeline{
        return ({
            columns: this.builder.buildColumns(rooms),
            data: this.builder.buildData(data, workingShift, glasses),
            summary: this.builder.buildSummary()
        })
    }
}

export default TimelineTransposedDirector;