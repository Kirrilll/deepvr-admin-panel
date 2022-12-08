import { ColumnsType } from "antd/lib/table"
import { CellPivot } from "./Cell";
import { Room } from "./Room"


export type TimelineType = 'loading' | 'transposed' | 'default';


export type OrderCellMatrix = (CellPivot | null)[][];

export interface SheduleTime {
    time: string,
    restGlasses: number
}

export interface Row<T extends Room | SheduleTime> {
    leadingCol: T & { key: string },
    shedule: (CellPivot | null)[]
}

export interface Timeline {
    columns: ColumnsType<any>,
    data: Row<any>[],
    summary?: (data: readonly Row<any>[]) => React.ReactNode
}
