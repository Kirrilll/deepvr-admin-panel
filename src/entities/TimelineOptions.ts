import { CellContentType } from "./Cell";

export type TimelineModeType = 'selection' | 'idle' | 'grabbing';


export interface TimelineOptions {
    cellView: CellContentType,
    isFixed: boolean,
    isShowCanceled: boolean
}

export interface TimelineMode {
    type: TimelineModeType,
    extraData?: any
}

export type TimelineActionType = 'moving' | 'tap';

export interface SelectionMode extends TimelineMode {
    type: TimelineModeType & 'selection',
    extraData?: string
}

export interface Idlemode extends TimelineMode {
    type: 'idle'
}
