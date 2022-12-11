import { ColumnsType } from "antd/lib/table"
import { OrderView } from "./Order";

import {Room} from "./Room"
import { TimelineOptions } from "./TimelineOptions";
import { OrderCellMatrix, Row, Timeline } from "./TimelineTypes"


export type SummaryCallback = ((data: readonly Row<any>[]) => React.ReactNode) | undefined;

export interface TimelineDirector {
    construct: (workingShift: string[], rooms: Room[], matrix: OrderCellMatrix, glasses: number ) => Timeline
}

export interface TimelineBuilder {
    buildSummary: (...args: any[]) => SummaryCallback,
    buildData: (globalData: OrderCellMatrix, rowData: string[] & Room[], ...args: any[]) => Row<any>[],
    buildColumns: (leadingData: any[]) => ColumnsType<any>
}