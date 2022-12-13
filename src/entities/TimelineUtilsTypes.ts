import { ColumnsType } from "antd/lib/table"
import { OrderView } from "./Order";

import {Room} from "./Room"
import { TimelineOptions } from "./TimelineOptions";
import { OrderCellMatrix, Row, Timeline, TimelineView } from "./TimelineTypes"


export type SummaryCallback = ((data: readonly Row<any>[]) => React.ReactNode) | undefined;
export type RestArgsTypes =[{rooms: Room[]}]
export interface TimelineDirector {
    construct: (timeline: Timeline<any, any>) => TimelineView
}

export interface TimelineBuilder {
    buildSummary: (...args: any[]) => SummaryCallback,
    buildData: (globalData: OrderCellMatrix, rowData: string[] & Room[], ...args: any[]) => Row<any>[],
    buildColumns: (leadingData: any[]) => ColumnsType<any>
}