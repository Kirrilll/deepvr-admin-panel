import { ColumnsType } from "antd/lib/table"
import BookingView from "./BookingView"
import {Room} from "./Room"


export type BookingMatrix = (BookingView | null)[][];
export type TimelineType = 'loading' | 'transposed' | 'default';

export interface SheduleTime {
    time: string,
    restGlasses: number
}

export interface Row<T extends Room | SheduleTime> {
    leadingCol: T & { key: string },
    shedule: (BookingView | null)[]
}

export interface Timeline {
    columns: ColumnsType<any>,
    data: Row<any>[],
    summary?: (data: readonly Row<any>[]) => React.ReactNode
}
