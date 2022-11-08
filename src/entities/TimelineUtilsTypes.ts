import { ColumnsType } from "antd/lib/table"
import {Room} from "./Room"
import { BookingMatrix, Row, Timeline } from "./TimelineTypes"


export type SummaryCallback = ((data: readonly Row<any>[]) => React.ReactNode) | undefined;

export interface TimelineDirector {
    construct: (workingShift: string[], rooms: Room[], data: BookingMatrix, glasses: number) => Timeline
}

export interface TimelineBuilder {
    buildSummary: (...args: any[]) => SummaryCallback,
    buildData: (globalData: BookingMatrix, rowData: string[] & Room[], ...args: any[]) => Row<any>[],
    buildColumns: (leadingData: any[]) => ColumnsType<any>
}