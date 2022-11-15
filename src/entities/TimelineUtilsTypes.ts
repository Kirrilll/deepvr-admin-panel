import { ColumnsType } from "antd/lib/table"
import OrderView from "./OrderView";
import {Room} from "./Room"
import { OrderCellMatrix, Row, Timeline } from "./TimelineTypes"




export type SummaryCallback = ((data: readonly Row<any>[]) => React.ReactNode) | undefined;

export interface TimelineDirector {
    construct: (workingShift: string[], rooms: Room[], data: OrderView[], glasses: number) => Timeline
}

export interface TimelineBuilder {
    buildSummary: (...args: any[]) => SummaryCallback,
    buildData: (globalData: OrderCellMatrix, rowData: string[] & Room[], ...args: any[]) => Row<any>[],
    buildColumns: (leadingData: any[]) => ColumnsType<any>
}