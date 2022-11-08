import { ColumnsType } from "antd/lib/table"
import {Room} from "./Room"
import { BookingMatrix, Row, Timeline } from "./TimelineTypes"

export interface TimelineDirector {
    construct: (workingShift: string[], rooms: Room[], data: BookingMatrix) => Timeline
}

export interface TimelineBuilder {
    buildSummary: ((data: readonly Row<any>[]) => React.ReactNode) | undefined,
    buildData: (globalData: BookingMatrix, rowData: string[] & Room[]) => Row<any>[],
    buildColumns: (leadingData: any[]) => ColumnsType<any>
}